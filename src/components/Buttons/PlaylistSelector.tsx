import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PlaylistContext from '../../contexts/PlaylistContext';
import { SpotifyAPI } from '../../../types';

export default function PlaylistSelector({
  setSelectedPlaylist,
  playlist,
}: {
  setSelectedPlaylist: Function;
  playlist: SpotifyAPI.Playlist;
}) {
  const router = useRouter();
  useEffect(() => {
    if (router.asPath !== '/dashboard') {
      router.replace('/dashboard', undefined, { shallow: true });
    }
  }, [router]);
  
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
