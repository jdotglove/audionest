import { Button } from '@mui/material';
import React from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { SpotifyAPI } from '../../../types';

export default function PlaylistDisplay(props: {
  playlist: SpotifyAPI.Playlist;
}) {
  return (
    <Button
      color="secondary"
      variant="outlined"
      style={{
        justifyContent: 'space-between',
        textTransform: 'none',
        borderRadius: '25px',
      }}
      endIcon={<ArrowForwardIosIcon sx={{ fontSize: '12px !important' }} />}
    >
      {props.playlist.name}
    </Button>
  );
}
