import React, { useEffect, useState, createContext } from 'react'
import SpotifyContext from './SpotifyContext';

const SpotifyWebApi = require('spotify-web-api-node');
// credentials are optional
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_AUDIONEST_CLIENT_ID,
  clientSecret: process.env.AUDIONEST_SECRET_ID,
  redirectUri: process.env.NEXT_PUBLIC_REDIRECT_URL
});

class SpotifyProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      token: '',
      playlists: [],
    }
  }
  
  login = async e => {
    const tokenMetadata = window.location.hash?.replace('#access_token=', '')
    const token = tokenMetadata.split('&')[0]
    // router.push('/dashboard', undefined, { shallow: true })
    this.setState({ token }); 
    spotifyApi.setAccessToken(`${token}`);
    // Get the authenticated user
    try {
      spotifyApi.getMe()
      .then(async function(response: { body: any }) {
        console.log('Some information about the authenticated user', response.body);
        this.setState({ user: { ...response.body } }); 
      }, function(err: any) {
        throw new Error(err);
      })
      // .finally(async function() {
      //   // Get a user's playlists
      //   await spotifyApi.getUserPlaylists(this.state.user.id)
      //   .then(function(data: { body: any }) {
      //     console.log('Retrieved playlists', data.body);
      //     dispatch({ type: 'SET_USER_PLAYLISTS', 
      //     payload: { 
      //       playlists: { 
      //         ...data.body 
      //       } 
      //     } 
      //   })
      //   },function(err: any) {
      //     console.log('Something went wrong!', err);
      //   });
      // })
    } catch (error) {
      console.error('Something went wrong', error)
    }
  };

  render() {
    return (
      <SpotifyContext.Provider
        value={{
          state: this.state,
          login: this.login,
        }}
      >
        <div>{this.props.children}</div>
      </SpotifyContext.Provider>
    );
  }
}

export default SpotifyProvider;
