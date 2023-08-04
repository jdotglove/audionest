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
  
  getPlaylistTracks = async (playlistId: string) => {
    try {
      const accessToken = SpotifyTokenCache.get('token');
      const response = await axios({
        url: `${process.env.NEXT_PUBLIC_BASE_API_URL}/playlist/${playlistId}/tracks?token=${accessToken}`,
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
  
  getRecommendation = async (recommendationConfig: Record<string, string | number>) => {
    try {
      // console.log('Getting Recommendation: ', recommendationConfig);
      // const accessToken = SpotifyTokenCache.get('token');
      // const response = await axios({
      //   url: `${process.env.NEXT_PUBLIC_BASE_API_URL}/recommendation?token=${accessToken}`,
      //   method: 'post',
      //   headers: {
      //     authorization: process.env.NEXT_PUBLIC_SERVER_API_KEY,
      //     'Content-Type': 'application/json',
      //   },
      //   data: JSON.stringify({
      //     ...recommendationConfig,
      //   }),
      // })
      // console.log('Response: ', response);
    } catch (error: any) {
      console.error('ERROR: Could not retrieve recommendation', error);
    }
  };
  componentDidMount = async () => {
    this.getRecommendation({
      limit: 10,
      market: 'EN',
      seed_artists: '',
      seed_genres: '',
      seed_tracks: '64791af3dfdfa1e845e8bd7a,',
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
      max_key: 1,
      min_liveness: 0,
      max_liveness: 1,
      min_loudness: 0,
      max_loudness: 1,
      min_mode: 0,
      max_mode: 1,
      min_popularity: 0,
      max_popularity: 1,
      min_speechiness: 0,
      max_speechiness: 1,
      min_tempo: 0,
      max_tempo: 1,
      min_time_signature: 0,
      max_time_signature: 1,
      min_valence: 0,
      max_valence: 1,
    })
  }
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
