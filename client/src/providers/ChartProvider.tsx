import React from 'react';
import {
  ChartProviderState,
  SelectedTrackRecord,
  SpotifyProviderProps,
} from '../../types';
import ChartContext from '../contexts/ChartContext';
import { TrackStatisticsCache } from '../cache';

class ChartProvider extends React.Component<
SpotifyProviderProps,
ChartProviderState
> {
  constructor(props: SpotifyProviderProps | Readonly<SpotifyProviderProps>) {
    super(props);
    this.state = {
      chartData: null,
    };
  }

  getTrackAudioFeatures = async (id: string) => {
    const cacheValue = TrackStatisticsCache.get(id);
    if (cacheValue !== -1) {
      return cacheValue;
    }
    try {
      // Get a track's audio features
      //const { body: data } = await spotifyWebApi.getAudioFeaturesForTrack(id);
      // TrackStatisticsCache.put(id, data);
      // return data;
    } catch (err) {
      console.error('ERROR: Could not retrieve audio features.', err);
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
        trackRecords.map(async (trackRecord) => {
          return this.cleanTrackFeaturesData(
            await this.getTrackAudioFeatures(trackRecord.id),
          );
        }),
      );
      const averages = data.reduce((acc, datum) => {
        Object.keys(datum).forEach((key) => {
          acc[key] += datum[key] / data.length;
        });
        return acc;
      }, {
        danceability: 0,
        energy: 0,
        speechiness: 0,
        acousticness: 0,
        liveness: 0,
        valence: 0,
      });
      this.setState({
        chartData: this.formatAsChartData([averages]) });
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
