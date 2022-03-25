import React from 'react'
import SpotifyContext from '../../src/SpotifyContext'

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
          )
        }
        </div>
      )}
    </SpotifyContext.Consumer>
  )  
}
