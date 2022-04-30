import React from 'react';
import { Container } from 'react-bootstrap';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);
export default function TrackStatistics({
  trackStats,
}: {
  trackStats: SpotifyApi.AudioFeaturesObject & { popularity: string | number };
}) {
  const { danceability, energy, speechiness, acousticness, liveness, valence, popularity } = trackStats;
  const data = {
    labels: ['Danceability', 'Energy', 'Speechiness', 'Acousticness', 'Liveness', 'Valence', 'Popularity'],
    datasets: [
      {
        label: '# of Votes',
        data: [danceability * 100, energy  * 100, speechiness * 100, acousticness * 100, liveness  * 100, valence  * 100, popularity],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
      },
    ],
  };

  return (
    <Container>
      {
        <h3> Track Statistics: </h3>
        {currentSelectedPlaylist.tracks.map(
          (playlistTrackDetails: SpotifyApi.PlaylistTrackObject) => {
            return (
              <Radar data={data} />
              
            );
          },
        )}
        
      }
    </Container>
  );
}
