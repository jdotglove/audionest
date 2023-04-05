import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import PlaylistContext from '../../contexts/PlaylistContext';

export default function PlaylistSelector({
  setSelectedPlaylist,
  playlist,
}: {
  setSelectedPlaylist: Function;
  playlist: SpotifyApi.PlaylistObjectSimplified;
}) {
  const router = useRouter();
  useEffect(() => {
    if (router.asPath !== '/dashboards/spotify') {
      router.replace('/dashboards/spotify', undefined, { shallow: true });
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
