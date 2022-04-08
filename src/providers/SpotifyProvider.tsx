import React from 'react';
import { SpotifyProviderProps, SpotifyProviderState } from '../../types';
import SpotifyContext from '../contexts/SpotifyContext';

const SpotifyWebApi = require('spotify-web-api-node');
// credentials are optional
export const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_AUDIONEST_CLIENT_ID,
  clientSecret: process.env.AUDIONEST_SECRET_ID,
  redirectUri:
    process.env.NEXT_PUBLIC_REDIRECT_URL ||
    `https://${process.env.HEROKU_APP_NAME}.herokuapp.com/dashboard`,
});

class SpotifyProvider extends React.Component<
SpotifyProviderProps,
SpotifyProviderState
> {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isLoggedIn: false,
      token: '',
      playlists: [],
      recommendations: null,
      genreSeeds: null,
    };
  }

  componentDidMount() {
    const persistedToken = window.localStorage.getItem('token');
    if (persistedToken !== 'undefined') this.login();
  }

  componentDidUpdate() {
    console.log('Component Updating');
    console.log(this.state);
  }

  componentWillUnmount() {
    console.log('Component About to Unmount');
  }

  login = async () => {
    const persistedToken = window.localStorage.getItem('token');
    const tokenMetadata = window.location.hash?.replace('#access_token=', '');
    const token = persistedToken || tokenMetadata.split('&')[0];
    if (!persistedToken) window.localStorage.setItem('token', token);
    console.log('Component Mounting');
    this.setState({ ...this.state });
    if (token) await spotifyApi.setAccessToken(token);
    // Get the authenticated user
    try {
      const response = await spotifyApi.getMe();
      console.log(
        'Some information about the authenticated user: ',
        response.body,
      );
      this.setState({ user: { ...response.body }, isLoggedIn: true });
      this.getUserPlaylists();
    } catch (error) {
      console.error('ERROR: Could not login user.', error);
    }
  };

  getUserPlaylists = async () => {
    try {
      // Get a user's playlists
      const response = await spotifyApi.getUserPlaylists(this.state.user.id);
      console.log('Retrieved playlists', response.body.items);
      this.setState({ playlists: response.body.items });
    } catch (err) {
      console.log("ERROR: Could not retrieve user's playlists.", err);
    }
  };

  getSeedRecommendations = async () => {
    // Get Recommendations Based on Seeds
    const response = await spotifyApi.getRecommendations({
      min_energy: 0.4,
      min_popularity: 50,
    });
    console.log('Some information on Seed Recommendations: ', response.body);
    this.setState({ recommendations: response.body });
  };

  getAvailableGenreSeeds = async () => {
    // Get available genre seeds
    const response = await spotifyApi.getAvailableGenreSeeds();
    console.log(response.body);
    this.setState({ genreSeeds: response.body });
  };

  render() {
    return (
      <SpotifyContext.Provider
        value={{
          user: this.state.user,
          isLoggedIn: this.state.isLoggedIn,
          login: this.login,
          getUserPlaylists: this.getUserPlaylists,
          playlists: this.state.playlists,
          getSeedRecommendations: this.getSeedRecommendations,
          getAvailableGenreSeeds: this.getAvailableGenreSeeds,
          recommendations: this.state.recommendations,
        }}
      >
        <div>{this.props.children}</div>
      </SpotifyContext.Provider>
    );
  }
}

export default SpotifyProvider;
