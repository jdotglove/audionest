import React from 'react';

import axios from '../plugins/axios';
import { PlaylistProviderState, PlaylistProviderProps } from '../../types';
import { SpotifyTokenCache } from '../cache';
import PlaylistContext from '../contexts/PlaylistContext'

class PlaylistProvider extends React.Component<PlaylistProviderProps, PlaylistProviderState> {
  constructor(props: PlaylistProviderProps | Readonly<PlaylistProviderProps>) {
    super(props);
    this.state = {
      tracks: [],
    };
  }
  
  getPlaylistTracks = async (playlistSpotifyId: string) => {
    try {
      const accessToken = SpotifyTokenCache.get('token');
      const response = await axios({
        url: `${process.env.NEXT_PUBLIC_BASE_API_URL}/playlist/${playlistSpotifyId}/tracks?token=${accessToken}`,
        method: 'get',
        headers: {
          authorization: process.env.NEXT_PUBLIC_SERVER_API_KEY,
          'Content-Type': 'application/json',
        },
      });
      this.setState({ tracks: [...(response.data || [])] });
      return response.data
    } catch (err: any) {
      console.error('ERROR: Could not retrieve playlist\'s tracks.', err);
    }
  };
  render() {
    return (
      <PlaylistContext.Provider
        value={{
          getPlaylistTracks: (id: string) => this.getPlaylistTracks(id),
        }}
      >
        {/* @ts-ignore */}
        <>{this.props.children}</>
      </PlaylistContext.Provider>
    );
  }
}

export default PlaylistProvider;
