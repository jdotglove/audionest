import React, { useContext } from 'react'
import PlaylistList from '../../src/components/Playlist/List'
import SpotifyContext from '../../src/contexts/SpotifyContext'
import {GlobalStateContext, GlobalDispatchContext} from '../../src/contexts/GlobalState'
import { SET_TOKEN, RESET_TOKEN } from '../../store/actions'

export default function Dashboard() {
  const globalState = useContext(GlobalStateContext)
  const dispatch = useContext(GlobalDispatchContext)
  

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
