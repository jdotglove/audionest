import React from 'react';
import {
  ChartProviderState,
  SelectedTrackRecord,
  SpotifyProviderProps,
} from '../../types';
import ChartContext from '../contexts/ChartContext';
import { spotifyWebApi } from './SpotifyProvider';
import { TrackStatisticsCache } from '../cache';

class ChartProvider extends React.Component<
SpotifyProviderProps,
ChartProviderState
> {
  constructor(props) {
    super(props);
    this.state = {
      chartData: null,
    };
  }

  getTrackAudioFeatures = async (id: string) => {
    if (TrackStatisticsCache.get(id) !== -1) {
      return TrackStatisticsCache.get(id)
    }
    try {
      // Get a track's audio features
      const { body: data } = await spotifyWebApi.getAudioFeaturesForTrack(id);
      TrackStatisticsCache.put(id, data)
      return data;
    } catch (err) {
      console.error("ERROR: Could not retrieve user's playlists.", err);
    }
  };

  cleanTrackFeaturesData = ({
    danceability,
    energy,
    speechiness,
    acousticness,
    liveness,
    valence,
  }: SpotifyApi.AudioFeaturesObject) => ({
    danceability,
    energy,
    speechiness,
    acousticness,
    liveness,
    valence,
  });

  formatAsChartData = (tracksData: any[]) => ({
    labels: Object.keys(tracksData[0]),
    datasets: tracksData.map((trackData) => (
      {
        data: Object.values(trackData).map((datum: number) => datum * 100),
        backgroundColor: 'rgba(13, 202, 240, 0.2)',
        borderColor: '#0dcaf0',
        borderWidth: 2,
      }
    )),
  });

  setChartData = async (trackRecords: Array<SelectedTrackRecord>) => {
    try {
      // Get a track's audio analysis
      const data = await Promise.all(
        trackRecords.map((trackRecord) => {
          return this.getTrackAudioFeatures(trackRecord.id);
        }),
      );
      this.setState({
        chartData: this.formatAsChartData(data.map((item) =>
          this.cleanTrackFeaturesData(item),
        ),
        ) });
    } catch (err) {
      console.error('ERROR: Could not set chart data.', err);
    }
  };

  render() {
    return (
      <ChartContext.Provider
        value={{
          setChartData: (trackRecords: Array<SelectedTrackRecord>) =>
            this.setChartData(trackRecords),
          chartData: this.state.chartData,
        }}
      >
        <div>{this.props.children}</div>
      </ChartContext.Provider>
    );
  }
}

export default ChartProvider;
