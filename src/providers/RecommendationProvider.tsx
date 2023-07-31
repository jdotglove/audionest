import React from 'react';

import axios from '../plugins/axios';
import { RecommendationProviderState, RecommendationProviderProps } from '../../types';
import { SpotifyTokenCache } from '../cache';
import RecommendationContext from '../contexts/RecommendationContext'

class RecommendationProvider extends React.Component<RecommendationProviderProps, RecommendationProviderState> {
  constructor(props: RecommendationProviderProps | Readonly<RecommendationProviderProps>) {
    super(props);
    this.state = {
      generateRecommendations: undefined,
      listOfSeedGenres: [],
    };
  }
  
  generateRecommendations = async (
    recommendationsConfig: Record<string, string | number | Array<string>>
  ) => {
    try {
      console.log('Getting Recommendations: ', recommendationsConfig);
      const accessToken = SpotifyTokenCache.get('token');
      const response = await axios({
        url: `${process.env.NEXT_PUBLIC_BASE_API_URL}/recommendations?token=${accessToken}`,
        method: 'post',
        headers: {
          authorization: process.env.NEXT_PUBLIC_SERVER_API_KEY,
          'Content-Type': 'application/json',
        },
        data: JSON.stringify({
          ...recommendationsConfig,
        }),
      })
      console.log('Response: ', response);
    } catch (error: any) {
      console.error('ERROR: Could not retrieve recommendation', error);
    }
  };
  getListOfSeedGenres = async () => {
    try {
      const accessToken = SpotifyTokenCache.get('token');
      const response = await axios({
        url: `${process.env.NEXT_PUBLIC_BASE_API_URL}/recommendations/seed-genres?token=${accessToken}`,
        method: 'get',
        headers: {
          authorization: process.env.NEXT_PUBLIC_SERVER_API_KEY,
          'Content-Type': 'application/json',
        },
      })
      console.log('Response: ', response);
      this.setState({ listOfSeedGenres: [...(response?.data || [])] });
    } catch (error: any) {
      console.error('ERROR: Could not retrieve recommendation', error);
    }
  };
  componentDidMount = async () => {
    this.generateRecommendations({
      limit: 10,
      seed_artists: [],
      seed_genres: [],
      seed_tracks: ['64791af3dfdfa1e845e8bd7a'],
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
      min_popularity: 0,
      max_popularity: 100,
      min_speechiness: 0,
      max_speechiness: 1,
      // min_tempo: 0,
      // max_tempo: 1,
      // min_time_signature: 0,
      // max_time_signature: 1,
      min_valence: 0,
      max_valence: 1,
    });
    this.getListOfSeedGenres();
  }
  render() {
    return (
      <RecommendationContext.Provider
        value={{
          generateRecommendations: (
            recommendationConfig: Record<string, any>,
          ) => this.generateRecommendations(recommendationConfig),
          listOfSeedGenres: this.state.listOfSeedGenres
        }}
      >
        <>{this.props.children}</>
      </RecommendationContext.Provider>
    );
  }
}

export default RecommendationProvider;
