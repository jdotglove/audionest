import SpotifyContext from '../../contexts/SpotifyContext';

export default function PlaylistList() {
  return (
    <SpotifyContext.Consumer>
      {({ getUserPlaylists, playlists }) => (
        <div>
          {(playlists.length)
            ? (
              <p>{JSON.stringify(playlists)}</p>
            )
            : (
              <button onClick={getUserPlaylists}>
                Get My Playlists!
              </button>
            )}
        </div>
      )}
    </SpotifyContext.Consumer>
  );
}
