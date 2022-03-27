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
            <div className="d-grid m-3 gap-2" style={{maxWidth: "300px"}}>
              <h3>Let's see what we're working with...</h3>
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
