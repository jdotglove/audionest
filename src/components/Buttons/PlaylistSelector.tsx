import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import PlaylistContext from '../../contexts/PlaylistContext';

export default function PlaylistSelector({
  setSelectedPlaylist,
  playlist,
}: {
  setSelectedPlaylist: Function;
  playlist: Audionest.Playlist;
}) {
  const router = useRouter();
  
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
              spotifyUri: playlist.spotifyUri,
              name: playlist.name,
              tracks: await getPlaylistTracks(playlist._id),
            });
          }}
        >
          {playlist ? playlist.name : ''}
        </Button>
      )}
    </PlaylistContext.Consumer>
  );
}
