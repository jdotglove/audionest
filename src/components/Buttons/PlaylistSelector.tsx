import React, { BaseSyntheticEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import PlaylistContext from '../../contexts/PlaylistContext';
import { SpotifyAPI } from '../../../types';

export default function PlaylistSelector({
  setSelectedPlaylist,
  playlist,
  isActive,
  setRadioValue,
}: {
  setSelectedPlaylist: Function;
  playlist: SpotifyAPI.Playlist;
  isActive: boolean;
  value: number;
  setRadioValue: Function
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
          variant={isActive ? 'info' : 'outline-info'}
          style={{
            justifyContent: 'space-between',
            textTransform: 'none',
            borderRadius: '25px',
          }}
          onClick={async (e: BaseSyntheticEvent) => {
            await setSelectedPlaylist({
              id: playlist.id,
              name: playlist.name,
              tracks: await getPlaylistTracks(playlist.id),
            });
            setRadioValue(e.target.value);
          }}
          active={isActive}
        >
          {playlist ? playlist.name : ''}
        </Button>
      )}
    </PlaylistContext.Consumer>
  );
}
