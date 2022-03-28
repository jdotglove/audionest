import React from 'react';
import { Button } from 'react-bootstrap';
import { SpotifyAPI } from '../../../types';
import SpotifyContext from '../../contexts/SpotifyContext';
import PlaylistDisplay from './Display';

export default function PlaylistList() {
  return (
    <SpotifyContext.Consumer>
      {({ getUserPlaylists, playlists }) => (
        <div>
          {(playlists.length)
            ? (
              <div className="d-grid m-3 gap-2" style={{ maxWidth: '300px' }}>
                <h3>Let&#39;s see what we&#39;re working with...</h3>
                {playlists.map((playlist: SpotifyAPI.Playlist) => <PlaylistDisplay playlist={playlist} key={playlist.id} />)}
              </div>
            )
            : (
              <Button onClick={getUserPlaylists}>
                Get My Playlists!
              </Button>
            )}
        </div>
      )}
    </SpotifyContext.Consumer>
  );
}
