import React, { Fragment } from "react";

import axios from "../plugins/axios";
import {
  RecommendationProviderState,
  RecommendationProviderProps,
} from "../../types";
import { SpotifyTokenCache } from "../cache";
import RecommendationContext from "../contexts/RecommendationContext";

const recommendationsConfigConstants = {
  limit: 10,
  min_acousticness: 0, // range 0 - 1
  max_acousticness: 1,
  min_danceability: 0,
  max_danceability: 1,
  // min_duration_ms: ,
  // max_duration_ms: ,
  // target_duration_ms: ,
  min_energy: 0,
  max_energy: 1,
  min_instrumentalness: 0,
  max_instrumentalness: 1,
  min_key: 0,
  max_key: 11,
  min_liveness: 0,
  max_liveness: 1,
  // min_loudness: 0,
  // max_loudness: 1,
  min_mode: 0,
  max_mode: 1,
  min_popularity: 30, // TODO: comeback and play with this floor
  max_popularity: 100,
  min_speechiness: 0,
  max_speechiness: 1,
  // min_tempo: 0,
  // max_tempo: 1,
  // min_time_signature: 0,
  // max_time_signature: 1,
  min_valence: 0,
  max_valence: 1,
};

class RecommendationProvider extends React.Component<
  RecommendationProviderProps,
  RecommendationProviderState
> {
  constructor(
    props: RecommendationProviderProps | Readonly<RecommendationProviderProps>
  ) {
    super(props);
    this.state = {
      listOfSeedGenres: [],
      recommendedTrackList: [],
      showQueueAlert: false,
      queueAddResult: undefined,
      selectedSeedArtists: [],
      selectedSeedGenres: [],
      selectedSeedTracks: [],
    };
  }

  generateRecommendations = async () => {
    try {
      const accessToken = SpotifyTokenCache.get("token");
      const response = await axios({
        url: `${process.env.NEXT_PUBLIC_BASE_API_URL}/recommendations?token=${accessToken}`,
        method: "post",
        headers: {
          authorization: process.env.NEXT_PUBLIC_SERVER_API_KEY,
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          ...recommendationsConfigConstants,
          seed_artists: this.state.selectedSeedArtists.map(
            (artistObj) => artistObj.id
          ),
          seed_genres: this.state.selectedSeedGenres,
          seed_tracks: this.state.selectedSeedTracks.map(
            (trackObj) => trackObj.id
          ),
        }),
      });
      this.setState({ recommendedTrackList: [...response.data] });
    } catch (error: any) {
      console.error("ERROR: Could not retrieve recommendation", error.message);
    }
  };
  getListOfSeedGenres = async () => {
    try {
      const accessToken = SpotifyTokenCache.get("token");
      const response = await axios({
        url: `${process.env.NEXT_PUBLIC_BASE_API_URL}/recommendations/seed-genres?token=${accessToken}`,
        method: "get",
        headers: {
          authorization: process.env.NEXT_PUBLIC_SERVER_API_KEY,
          "Content-Type": "application/json",
        },
      });
      this.setState({ listOfSeedGenres: [...(response?.data || [])] });
    } catch (error: any) {
      console.error("ERROR: Could not retrieve recommendation", error.message);
    }
  };

  handleGenreInputChange = (genre: string, checkboxObj: any) => {
    if (checkboxObj.checked) {
      if (this.maxSeedCapacityReached()) {
        return;
      }
      this.setState({
        selectedSeedGenres: [...this.state.selectedSeedGenres, genre],
      });
    } else {
      this.setState({
        selectedSeedGenres: [
          ...this.state.selectedSeedGenres.filter(
            (selectedGenre) => selectedGenre !== genre
          ),
        ],
      });
    }
  };

  addSeedArtist = (artistPayload: any) => {
    if (this.maxSeedCapacityReached()) {
      return;
    }
    if (!this.state.selectedSeedArtists.includes(artistPayload.id)) {
      this.setState({
        selectedSeedArtists: [
          ...this.state.selectedSeedArtists,
          { id: artistPayload.id, name: artistPayload.name },
        ],
      });
    }
  };

  maxSeedCapacityReached = () => {
    return (
      this.state.selectedSeedArtists.length +
        this.state.selectedSeedGenres.length +
        this.state.selectedSeedTracks.length >=
      5
    );
  };

  addSeedTrack = (trackPayload: any) => {
    if (this.maxSeedCapacityReached()) {
      return;
    }
    if (!this.state.selectedSeedArtists.includes(trackPayload.id)) {
      this.setState({
        selectedSeedTracks: [
          ...this.state.selectedSeedTracks,
          { id: trackPayload.id, name: trackPayload.name },
        ],
      });
    }
  };

  atLeastOneSeedSelected = () => {
    return (
      this.state.selectedSeedArtists.length +
        this.state.selectedSeedTracks.length >=
      1
    );
  };

  clearSelectedSeeds = () => {
    this.setState({
      selectedSeedArtists: [],
      selectedSeedTracks: [],
    });
  };

  addToQueue = async (userSpotifyId: string, track: any) => {
    try {
      const accessToken = SpotifyTokenCache.get("token");
      await axios({
        url: `${process.env.NEXT_PUBLIC_BASE_API_URL}/user/${userSpotifyId}/queue?token=${accessToken}`,
        method: "post",
        headers: {
          authorization: process.env.NEXT_PUBLIC_SERVER_API_KEY,
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          trackUri: track.uri,
        }),
      });
      this.setState({
        showQueueAlert: true,
        queueAddResult: 'success',
      });
    } catch (error: any) {
      console.error("ERROR: Could not add track to queue", error.message);
      this.setState({
        showQueueAlert: true,
        queueAddResult: 'error',
      })
    }
  }

  dismissAddToQueueAlert = () => {
    this.setState({
      showQueueAlert: false,
    });
  }

  // componentDidMount = async () => {
  //   this.getListOfSeedGenres();
  // };
  render() {
    return (
      <RecommendationContext.Provider
        value={{
          addToQueue: (userSpotifyId: string, track: any) => this.addToQueue(userSpotifyId, track),
          addSeedArtist: (artistPayload: any) =>
            this.addSeedArtist(artistPayload),
          addSeedTrack: (trackPayload: any) => this.addSeedTrack(trackPayload),
          atLeastOneSeedSelected: () => this.atLeastOneSeedSelected(),
          dismissAddToQueueAlert: () => this.dismissAddToQueueAlert(),
          clearSelectedSeeds: () => this.clearSelectedSeeds(),
          generateRecommendations: () => this.generateRecommendations(),
          handleGenreInputChange: (genre: string, checkboxObj: any) =>
            this.handleGenreInputChange(genre, checkboxObj),
          listOfSeedGenres: this.state.listOfSeedGenres,
          queueAddResult: this.state.queueAddResult,
          recommendedTrackList: this.state.recommendedTrackList,
          showQueueAlert: this.state.showQueueAlert,
          selectedSeedArtists: this.state.selectedSeedArtists,
          selectedSeedGenres: this.state.selectedSeedGenres,
          selectedSeedTracks: this.state.selectedSeedTracks,
        }}
      >
        {/* @ts-ignore */}
        <Fragment>{this.props.children}</Fragment>
      </RecommendationContext.Provider>
    );
  }
}

export default RecommendationProvider;
