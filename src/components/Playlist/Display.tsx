import React, { useState } from 'react';
import { SpotifyAPI } from '../../../types';
import SpotifyContext from '../../contexts/SpotifyContext';
import PlaylistSelector from '../Buttons/PlaylistSelector';

export default function PlaylistDisplay() {
  const [radioValue, setRadioValue] = useState();
  return (
    <SpotifyContext.Consumer>
      {({ playlists, setSelectedPlaylist }) => (
        <div>
          {playlists.length && (
            <div className="d-grid m-3 gap-2" style={{ maxWidth: '300px' }}>
              <h3>Let&#39;s see what we&#39;re working with...</h3>
              {playlists.map((playlist: SpotifyAPI.Playlist, idx: number) => {
                return (
                  <PlaylistSelector
                    playlist={playlist}
                    key={idx}
                    setSelectedPlaylist={setSelectedPlaylist}
                    isActive={radioValue === idx}
                    setRadioValue={setRadioValue}
                  />
                );
              })}
            </div>
          )}
        </div>
      )}
    </SpotifyContext.Consumer>
  );
}
