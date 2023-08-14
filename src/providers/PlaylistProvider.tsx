import React, { Fragment } from "react";

import axios from "../plugins/axios";
import { PlaylistProviderState, PlaylistProviderProps } from "../../types";
import { SpotifyCache } from "../cache";
import PlaylistContext from "../contexts/PlaylistContext";

class PlaylistProvider extends React.Component<
  PlaylistProviderProps,
  PlaylistProviderState
> {
  constructor(props: PlaylistProviderProps | Readonly<PlaylistProviderProps>) {
    super(props);
    this.state = {
      selectedTracks: [],
      showPlaylistBuilder: false,
    };
  }
  addToPlaylistBuilder = (track: any) => {
    this.setState({ selectedTracks: [...this.state.selectedTracks, track] });
    this.toggleShowPlaylistBuilder(true);
  };
  removeFromPlaylistBuilder = (track: any) => {
    this.setState({
      selectedTracks: [
        ...this.state.selectedTracks.filter(
          (selectedTrack) => selectedTrack.id !== track.id
        ),
      ],
    });
  };
  toggleShowPlaylistBuilder = (newDisplayValue: boolean) => {
    this.setState({
      showPlaylistBuilder: newDisplayValue,
    });
  };

  getPlaylistTracks = async (playlistSpotifyId: string) => {
    try {
      const accessToken = SpotifyCache.get("token");
      const response = await axios({
        url: `${process.env.NEXT_PUBLIC_BASE_API_URL}/playlist/${playlistSpotifyId}/tracks?token=${accessToken}`,
        method: "get",
        headers: {
          authorization: process.env.NEXT_PUBLIC_SERVER_API_KEY,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (err: any) {
      console.error(
        "ERROR: Could not retrieve playlist's tracks.",
        err.message
      );
    }
  };

  savePlaylist = async (
    userSpotifyId: string,
    playlistTitle: string,
    playlistDescription: string
  ) => {
    try {
      const accessToken = SpotifyCache.get("token");
      await axios({
        url: `${process.env.NEXT_PUBLIC_BASE_API_URL}/user/${userSpotifyId}/playlist?token=${accessToken}`,
        method: "post",
        headers: {
          authorization: process.env.NEXT_PUBLIC_SERVER_API_KEY,
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          playlistName: playlistTitle,
          playlistDescription,
          publicPlaylist: false,
          tracks: this.state.selectedTracks.map(
            (trackObj) => trackObj.uri
          ),
        }),
      });
    } catch (error: any) {
      console.error("ERROR: Could not save playlist", error);
    }
  };

  clearPlaylistBuilder = () => {
    this.setState({
      selectedTracks: [],
    });
  }
  render() {
    return (
      <PlaylistContext.Provider
        value={{
          addToPlaylistBuilder: (track: any) =>
            this.addToPlaylistBuilder(track),
          clearPlaylistBuilder: () => this.clearPlaylistBuilder(),
          getPlaylistTracks: (id: string) => this.getPlaylistTracks(id),
          removeFromPlaylistBuilder: (track: any) =>
            this.removeFromPlaylistBuilder(track),
          savePlaylist: (
            userSpotifyId: string,
            playlistTitle: string,
            playlistDescription: string
          ) =>
            this.savePlaylist(
              userSpotifyId,
              playlistTitle,
              playlistDescription
            ),
          selectedTracks: this.state.selectedTracks,
          showPlaylistBuilder: this.state.showPlaylistBuilder,
          toggleShowPlaylistBuilder: (newDisplayValue: boolean) =>
            this.toggleShowPlaylistBuilder(newDisplayValue),
        }}
      >
        {/* @ts-ignore */}
        <Fragment>{this.props.children}</Fragment>
      </PlaylistContext.Provider>
    );
  }
}

export default PlaylistProvider;
