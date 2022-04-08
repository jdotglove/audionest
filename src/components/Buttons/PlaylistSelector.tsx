import { Button } from '@mui/material';
import React from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PlaylistContext from '../../contexts/PlaylistContext';
import SpotifyContext from '../../contexts/SpotifyContext';
import { SpotifyAPI } from '../../../types';

export default function PlaylistSelector({
  setSelectedPlaylist,
  playlist,
}: {
  setSelectedPlaylist: Function;
  playlist: SpotifyAPI.Playlist;
}) {
  return (
    <PlaylistContext.Consumer>
      {({ getPlaylistTracks }) => (
        <Button
          color="secondary"
          variant="outlined"
          style={{
            justifyContent: 'space-between',
            textTransform: 'none',
            borderRadius: '25px',
          }}
          endIcon={<ArrowForwardIosIcon sx={{ fontSize: '12px !important' }} />}
          onClick={async () => {
            await setSelectedPlaylist(await getPlaylistTracks(playlist.id));
          }}
        >
          {playlist ? playlist.name : ''}
        </Button>
      )}
    </PlaylistContext.Consumer>
  );
}
