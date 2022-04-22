import React from 'react';
import { Container } from 'react-bootstrap';
import TrackContext from '../../contexts/TrackContext';

export default function TrackStatistics({
  track,
}: {
  track: SpotifyApi.TrackObjectFull;
}) {
  return (
    <div>
      <TrackContext.Consumer>
        {({ getTrackAudioFeatures }) => (
          <Container>
              {
                <div>{JSON.stringify(getTrackAudioFeatures(track.id), null, 4)}</div>
                //const trackAudioAnalysis = await getTrackAudioAnalysis(track.id);
              }
          </Container>
        )}
      </TrackContext.Consumer>
    </div>
  );
}
