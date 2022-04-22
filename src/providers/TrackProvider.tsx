import React from 'react';
import { TrackProviderState, SpotifyProviderProps } from '../../types';
import TrackContext from '../contexts/TrackContext';
import { spotifyApi } from './SpotifyProvider';


class TrackProvider extends React.Component<SpotifyProviderProps, TrackProviderState> {
  constructor(props) {
    super(props);
    this.state = {
      tracks: [],
    };
  }
  
  getTrackAudioFeatures = async (id: string) => {
    console.log('here!', id);
    try {
      // Get a track's audio features
      const data = await spotifyApi.getAudioFeaturesForTrack(id);
      console.log('Retrieved Audio Features in TrackProvider', data.body.items);
      this.setState({ tracks: data.body.items });
      return data.body.items;
    } catch (err: any) {
      console.log('ERROR: Could not retrieve user\'s playlists.', err);
    }
  };

  getTrackAudioAnalysis = async (id: string) => {
    console.log('here!', id);
    try {
      // Get a track's audio analysis
      const data = await spotifyApi.getAudioAnalysisForTrack(id);
      console.log('Retrieved Audio Analysis in TrackProvider', data.body.items);
      this.setState({ tracks: data.body.items });
      return data.body.items;
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
