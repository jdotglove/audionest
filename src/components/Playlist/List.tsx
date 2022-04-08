import React from 'react';
import { SpotifyAPI } from '../../../types';
import SpotifyContext from '../../contexts/SpotifyContext';
import PlaylistNameButton from './NameButton';

export default function PlaylistList() {
  return (
    <SpotifyContext.Consumer>
      {({ playlists }) => (
        <div>
          {playlists.length && (
            <div className='d-grid m-3 gap-2' style={{ maxWidth: '300px' }}>
              <h3>Let&#39;s see what we&#39;re working with...</h3>
              {playlists.map((playlist: SpotifyAPI.Playlist) => {
                return (
                  <PlaylistNameButton playlist={playlist} key={playlist.id} />
                );
              })}
            </div>
          )}
        </div>
      )}
    </SpotifyContext.Consumer>
  );
}
