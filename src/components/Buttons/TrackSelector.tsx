import React from 'react';
import { ListGroup } from 'react-bootstrap';
import ChartContext from '../../contexts/ChartContext';
import PlaylistContext from '../../contexts/PlaylistContext';

export default function TrackSelector({
  setSelectedTracks,
  track,
}: {
  setSelectedTracks: Function;
  track: Audionest.Track;
}) {
  return (
    <PlaylistContext.Consumer>
      {({ getPlaylistTracks }) => (
        <ChartContext.Consumer>
          {({ setChartData }) => (
            <ListGroup.Item
              action
              variant="dark"
              key={track._id}
              eventKey={`${track._id}`}
              onClick={async () => {
                setSelectedTracks([track._id]);
                await setChartData([track._id]);
              }}
            >
              {track ? track.name : ''}
            </ListGroup.Item>
          )}
        </ChartContext.Consumer>
      )}
      </PlaylistContext.Consumer>
  );
}
