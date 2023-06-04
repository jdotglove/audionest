import React from 'react';

import axios from '../plugins/axios';
import { PlaylistProviderState, SpotifyProviderProps } from '../../types';
import { SpotifyTokenCache } from '../cache';
import PlaylistContext from '../contexts/PlaylistContext'

class PlaylistProvider extends React.Component<SpotifyProviderProps, PlaylistProviderState> {
  constructor(props: SpotifyProviderProps | Readonly<SpotifyProviderProps>) {
    super(props);
    this.state = {
      tracks: [],
    };
  }
  
  getPlaylistTracks = async (playlistId: string) => {
    try {
      const accessToken = SpotifyTokenCache.get('token');
      console.log('Access Token: ', accessToken);
      const response = await axios({
        url: `${process.env.NEXT_PUBLIC_BASE_API_URL}/playlist/${playlistId}/tracks`,
        method: 'post',
        headers: {
          authorization: process.env.NEXT_PUBLIC_SERVER_API_KEY,
          'Content-Type': 'application/json',
        },
        data: JSON.stringify({
          spotifyToken: accessToken,
        })
      });
      this.setState({ tracks: [...(response.data || [])] });
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
        <div>{this.props.children}</div>
      </PlaylistContext.Provider>
    );
  }
}

export default PlaylistProvider;
