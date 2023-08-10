import React from "react";

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
      console.error("ERROR: Could not retrieve recommendation", error);
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
      console.error("ERROR: Could not retrieve recommendation", error);
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

  playlistToSave = () => {
    return this.state.recommendedTrackList.length > 0;
  };

  clearSelectedSeeds = () => {
    this.setState({
      selectedSeedArtists: [],
      selectedSeedGenres: [],
    });
  };

  savePlaylist = async (userId: string, spotifyUserId: string) => {
    try {
      const accessToken = SpotifyTokenCache.get("token");
      await axios({
        url: `${process.env.NEXT_PUBLIC_BASE_API_URL}/user/${userId}/playlist?token=${accessToken}`,
        method: "post",
        headers: {
          authorization: process.env.NEXT_PUBLIC_SERVER_API_KEY,
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          spotifyId: spotifyUserId,
          playlistName: "Test Playlist",
          publicPlaylist: false,
          tracks: this.state.recommendedTrackList.map(
            (trackObj) => trackObj.uri
          ),
        }),
      });
    } catch (error: any) {
      console.error("ERROR: Could not save playlist", error);
    }
  };

  componentDidMount = async () => {
    this.getListOfSeedGenres();
  };
  render() {
    return (
      <RecommendationContext.Provider
        value={{
          addSeedArtist: (artistPayload: any) =>
            this.addSeedArtist(artistPayload),
          addSeedTrack: (trackPayload: any) => this.addSeedTrack(trackPayload),
          atLeastOneSeedSelected: () => this.atLeastOneSeedSelected(),
          clearSelectedSeeds: () => this.clearSelectedSeeds(),
          generateRecommendations: () => this.generateRecommendations(),
          handleGenreInputChange: (genre: string, checkboxObj: any) =>
            this.handleGenreInputChange(genre, checkboxObj),
          listOfSeedGenres: this.state.listOfSeedGenres,
          playlistToSave: () => this.playlistToSave(),
          recommendedTrackList: this.state.recommendedTrackList,
          savePlaylist: (userId: string, spotifyUserId: string) =>
            this.savePlaylist(userId, spotifyUserId),
          selectedSeedArtists: this.state.selectedSeedArtists,
          selectedSeedGenres: this.state.selectedSeedGenres,
          selectedSeedTracks: this.state.selectedSeedTracks,
        }}
      >
        {/* @ts-ignore */}
        <>{this.props.children}</>
      </RecommendationContext.Provider>
    );
  }
}

export default RecommendationProvider;
