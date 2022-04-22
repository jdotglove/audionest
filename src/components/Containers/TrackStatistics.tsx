import React from 'react';
import { Container } from 'react-bootstrap';

export default function TrackStatistics({
  trackStats,
}: {
  trackStats: SpotifyApi.AudioFeaturesObject & { popularity: string | number };
}) {
  return (
    <Container>
      {
        <div>{JSON.stringify(trackStats, null, 4)}</div>
      }
    </Container>
  );
}
