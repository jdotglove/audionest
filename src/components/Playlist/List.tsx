import React from 'react'
import { Button } from 'react-bootstrap'
import SpotifyContext from '../../SpotifyContext'
import { SpotifyAPI } from '../../../types'
import PlaylistDisplay from './Display'

export default function PlaylistList() {
  return (
    <SpotifyContext.Consumer>
      {({ getUserPlaylists, playlists }) => (
        <div>
        {(playlists.length)
          ? (
            <div>
              {playlists.map((playlist: SpotifyAPI.Playlist) =>{
                return <PlaylistDisplay playlist={playlist} key={playlist.id} />
              })}
            </div>
          )
          : (
            <Button onClick={getUserPlaylists}>
              Get My Playlists!
            </Button>
          )
        }
        </div>
      )}
    </SpotifyContext.Consumer>
  )  
}
