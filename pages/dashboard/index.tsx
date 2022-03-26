import React from 'react'
import PlaylistList from '../../src/components/Playlist/List'
import SpotifyContext from '../../src/contexts/SpotifyContext'

export default function Dashboard() {

  return (
    <SpotifyContext.Consumer>
      {({ login, isLoggedIn, user }) => (
      <div>
        {isLoggedIn
          ? <p>Welcome, {user.display_name.split(' ')[0]}!</p>
          : (
          <button onClick={login}>
            Login
          </button>)
        }
        <PlaylistList />
      </div>
      )}
    </SpotifyContext.Consumer>
  )  
}
