import React from 'react'
import { AudioNestUser, SpotifyAPI } from '../types';
import SpotifyContext from './SpotifyContext';

const SpotifyWebApi = require('spotify-web-api-node');
// credentials are optional
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_AUDIONEST_CLIENT_ID,
  clientSecret: process.env.AUDIONEST_SECRET_ID,
  redirectUri: process.env.NEXT_PUBLIC_REDIRECT_URL
});

interface SpotifyProviderProps {}

interface SpotifyProviderState {
  user: AudioNestUser | null,
  token: string,
  playlists: Array<SpotifyAPI.Playlist>
}

class SpotifyProvider extends React.Component<SpotifyProviderProps, SpotifyProviderState> {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      token: '',
      playlists: [],
    }
  }
  
  login = async () => {
    const tokenMetadata = window.location.hash?.replace('#access_token=', '')
    const token = tokenMetadata.split('&')[0]
    
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
    } catch (error) {
      console.error('Something went wrong', error)
    }
  };

  getUserPlaylists = async () => {
    if (!this.state.user) {
      await this.login()
    }
    try {
      // Get a user's playlists
      await spotifyApi.getUserPlaylists(this.state.user.id)
        .then(function(data: { body: any }) {
          console.log('Retrieved playlists', data.body);
          this.setState({ playlists: {...data.body } })
        })
    } catch (err: any) {
      console.log('Something went wrong!', err);
    }
  }

  render() {
    return (
      <SpotifyContext.Provider
        value={{
          state: this.state,
          login: this.login,
          getUserPlaylists: this.getUserPlaylists,
        }}
      >
        <div>{this.props.children}</div>
      </SpotifyContext.Provider>
    );
  }
}

export default SpotifyProvider;
