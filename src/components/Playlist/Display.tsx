import React from 'react'
import { SpotifyAPI } from '../../../types'

export default function PlaylistDisplay(props: {playlist: SpotifyAPI.Playlist }) {
  return (
    <div>
      <h2>{props.playlist.name}</h2>
    </div>
  ) 
}
