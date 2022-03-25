import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import SpotifyContext from '../../src/SpotifyContext'

export default function Dashboard() {
  // const router = useRouter()
  // useEffect(() => {
  //   router.push('/dashboard', undefined, { shallow: true })
  // })
  return (
    <SpotifyContext.Consumer>
      {({ login, getUserPlaylists }) => (
        <div>
        <button onClick={login}>
          Login
        </button>
        <button onClick={getUserPlaylists}>
          Get My Playlists!
        </button>
        
      </div>
      )}
    </SpotifyContext.Consumer>
  )  
}
