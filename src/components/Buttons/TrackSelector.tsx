import React from 'react';
import { ListGroup } from 'react-bootstrap';
import ChartContext from '../../contexts/ChartContext';

export default function TrackSelector({
  setSelectedTracks,
  track,
}: {
  setSelectedTracks: Function;
  track: SpotifyApi.TrackObjectFull;
}) {
  return (
    <ChartContext.Consumer>
      {({ setChartData }) => (
        <ListGroup.Item
          action
          variant="dark"
          key={track.id}
          eventKey={`${track.id}`}
          onClick={async () => {
            setSelectedTracks([{ id: track.id, name: track.name }]);
            await setChartData([{ id: track.id, name: track.name }]);
          }}
        >
          {track ? track.name : ''}
        </ListGroup.Item>
      )}
    </ChartContext.Consumer>
  );
}
