import React from 'react';
import { TrackProviderState, SpotifyProviderProps } from '../../types';
import TrackContext from '../contexts/TrackContext';
import { spotifyWebApi } from './SpotifyProvider';


class TrackProvider extends React.Component<SpotifyProviderProps, TrackProviderState> {
  getTrackAudioFeatures = async (id: string) => {
    console.log('here');
    try {
      // Get a track's audio features
      const data = await spotifyWebApi.getAudioFeaturesForTrack(id);
      console.log('Retrieved Audio Features in TrackProvider', JSON.stringify(data.body, null, 4));
      //this.setState({ trackAudioFeatures: data.body.items });
      return data.body;
    } catch (err: any) {
      console.log('ERROR: Could not retrieve user\'s playlists.', err);
    }
  };

  getTrackAudioAnalysis = async (id: string) => {
    try {
      // Get a track's audio analysis
      const data = await spotifyWebApi.getAudioAnalysisForTrack(id);
      console.log('Retrieved Audio Analysis in TrackProvider', JSON.stringify(data.body, null, 4));
      return data.body;
    } catch (err: any) {
      console.log('ERROR: Could not retrieve user\'s playlists.', err);
    }
  };

  render() {
    return (
      <TrackContext.Provider
        value={{
          getTrackAudioFeatures: (id: string) => this.getTrackAudioFeatures(id),
          getTrackAudioAnalysis: (id: string) => this.getTrackAudioAnalysis(id),
        }}
      >
        <div>{this.props.children}</div>
      </TrackContext.Provider>
    );
  }
}

export default TrackProvider;
