import React, { useEffect, useState } from 'react'
import SpotifyContext from '../../src/SpotifyContext'

export default function Dashboard() {
  return (
    <SpotifyContext.Consumer>
      {({login}) => (
        <button onClick={login}>
          Login
        </button>
      )}
    </SpotifyContext.Consumer>
  )  
}
