import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
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
          variant='outline-info'
          style={{
            justifyContent: 'space-between',
            textTransform: 'none',
            borderRadius: '25px',
          }}
          onClick={async () => {
            await setSelectedPlaylist({
              id: playlist.id,
              name: playlist.name,
              tracks: await getPlaylistTracks(playlist.id),
            });
          }}
        >
          {playlist ? playlist.name : ''}
        </Button>
      )}
    </PlaylistContext.Consumer>
  );
}
