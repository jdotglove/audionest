import React from 'react';
import { SelectedTrackRecord, SpotifyProviderProps, SpotifyProviderState } from '../../types';
import SpotifyContext from '../contexts/SpotifyContext';

const SpotifyWebApi = require('spotify-web-api-node');
// credentials are optional
export const spotifyWebApi = new SpotifyWebApi({
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
      currentSelectedPlaylist: null,
      currentSelectedTracks: [],
      genreSeeds: null,
    };
  }

  componentDidMount() {
    const persistedToken = window.localStorage.getItem('token');
    if (persistedToken !== 'undefined') this.login();
  }

  componentDidUpdate() {
    console.log('Spotify Provider Updating');
    console.log(this.state);
  }

  componentWillUnmount() {
    console.log('Spotify Provider About to Unmount');
  }

  login = async () => {
    const persistedToken = window.localStorage.getItem('token');
    const tokenMetadata = window.location.hash?.replace('#access_token=', '');
    const token = persistedToken || tokenMetadata.split('&')[0];
    if (!persistedToken) window.localStorage.setItem('token', token);
    console.log('Spotify Provider Mounting');
    this.setState({ ...this.state });
    if (token) await spotifyWebApi.setAccessToken(token);
    // Get the authenticated user
    try {
      const response = await spotifyWebApi.getMe();
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
      const response = await spotifyWebApi.getUserPlaylists(this.state.user.id);
      console.log('Retrieved playlists', response.body.items);
      this.setState({ playlists: response.body.items });
    } catch (err) {
      console.log("ERROR: Could not retrieve user's playlists.", err);
    }
  };

  getSeedRecommendations = async () => {
    // Get Recommendations Based on Seeds
    const response = await spotifyWebApi.getRecommendations({
      min_energy: 0.4,
      min_popularity: 50,
    });
    console.log('Some information on Seed Recommendations: ', response.body);
  };

  getAvailableGenreSeeds = async () => {
    // Get available genre seeds
    const response = await spotifyWebApi.getAvailableGenreSeeds();
    console.log(response.body);
    this.setState({ genreSeeds: response.body });
  };

  setSelectedPlaylist = async (playlistData: any) => {
    console.log('Setting selected playlist: ', playlistData);
    this.setState({ currentSelectedPlaylist: playlistData });
  };

  setSelectedTracks = async (trackRecord: SelectedTrackRecord) => {
    this.setState({ currentSelectedTracks: this.state.currentSelectedTracks.concat(trackRecord) });
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
          setSelectedPlaylist: this.setSelectedPlaylist,
          setSelectedTracks: this.setSelectedTracks,
          currentSelectedPlaylist: this.state.currentSelectedPlaylist,
          currentSelectedTracks: this.state.currentSelectedTracks,
          recommendations: null,
        }}
      >
        <div>{this.props.children}</div>
      </SpotifyContext.Provider>
    );
  }
}

export default SpotifyProvider;
