import { Button, Chip, Container } from '@mui/material'
import React from 'react'
import { SpotifyAPI } from '../../../types'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PlaylistProvider from '../../providers/PlaylistProvider';
import PlaylistContext from '../../contexts/PlaylistContext';
import SpotifyContext from '../../contexts/SpotifyContext';

export default function PlaylistDisplay(props: { playlist: SpotifyAPI.Playlist }) {
  return (
    <PlaylistContext.Consumer>
      {({ getPlaylistTracks }) => (
        <Button 
          color="secondary"
          variant="outlined"
          style={{
            justifyContent: 'space-between',
            textTransform: "none",
            borderRadius: '25px'
          }}
          endIcon={<ArrowForwardIosIcon sx={{fontSize: '12px !important'}} />}
          onClick={() => getPlaylistTracks(props.playlist.id)}
        >
          {props.playlist.name}
        </Button>
      )}
    </PlaylistContext.Consumer>
  )
}
