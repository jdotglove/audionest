import React from 'react';
import SpotifyContext from '../../contexts/SpotifyContext';
import PlaylistSelector from '../Buttons/PlaylistSelector';
import { Container } from 'react-bootstrap';

export default function PlaylistDisplay() {
  return (
    <SpotifyContext.Consumer>
      {({ playlists, setSelectedPlaylist }) => (
        <Container>
          {playlists.length && (
            <div className='d-grid m-3 gap-2' style={{ maxWidth: '300px' }}>
              <h3>Let&#39;s see what we&#39;re working with...</h3>
              {playlists.map((playlist: SpotifyApi.PlaylistObjectSimplified, idx: number) => {
                return (
                  <PlaylistSelector
                    playlist={playlist}
                    key={idx}
                    setSelectedPlaylist={setSelectedPlaylist}
                  />
                );
              })}
            </div>
          )}
        </Container>
      )}
    </SpotifyContext.Consumer>
  );
}
