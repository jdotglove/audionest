import React from 'react';
import SpotifyWebApi from 'spotify-web-api-node';

import { getURLHash } from '../utils/spotify';
import { SelectedTrackRecord, SpotifyProviderProps, SpotifyProviderState } from '../../types';
import SpotifyContext from '../contexts/SpotifyContext';
import { authenticateSpotify } from '../middleware/spotify';
// credentials are optional
export const spotifyWebApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_AUDIONEST_CLIENT_ID,
  clientSecret: process.env.AUDIONEST_SECRET_ID,
  redirectUri:
    process.env.NEXT_PUBLIC_REDIRECT_URL,
});

class SpotifyProvider extends React.Component<
SpotifyProviderProps,
SpotifyProviderState
> {
  constructor(props: SpotifyProviderProps | Readonly<SpotifyProviderProps>) {
    super(props);
    this.state = {
      authenticateSpotifyUser: null,
      currentSelectedPlaylist: null,
      currentSelectedTracks: [],
      genreSeeds: null,
      isLoggedIn: false,
      playlists: [],
      user: null,
      token: '',
      topTracks: [],
    };
  }

  async componentDidMount() {
    console.log('Mounted!');
    // @ts-ignore
    const accessToken = (await getURLHash()).access_token;
    console.log('Get URL Hash: ', accessToken);

    // if (accessToken) {
    //   if (!this.props.noCookie) {
    //     document.cookie = `spotifyAuthToken=${accessToken}; max-age=${60 * 60};`;
    //   }
    //   if (this.props.localStorage) {
    //     window.localStorage.setItem('spotifyAuthToken', accessToken);
    //   }
    //   window.opener?.postMessage({ type: 'react-spotify-auth', accessToken }, '*');
    //   this.props.onAccessToken(accessToken);
    // }
  }

  login = async () => {
    const accessToken = window.location.hash?.replace('#access_token=', '');
    const persistedToken = window.localStorage.getItem('token');
    console.log(window.location);
    console.log('AccessToken: ', accessToken);
    console.log('Persisted Token: ', persistedToken);
    let token = !accessToken || (persistedToken === accessToken.split('&')[0])
      ? persistedToken : accessToken.split('&')[0];
    console.log('Token: ', token);
    window.localStorage.setItem('token', token);
    // // TODO: Check this logic
    // this.setState({ ...this.state });
    // if (token) {
    //   window.localStorage.setItem('token', token);
    // }
    // Get the authenticated user
    try {
      // TODO: test if setting token in state can also persist authentication if needed
      // const { body } = await spotifyWebApi.getMe();
      // this.setState({ user: { ...body }, isLoggedIn: true });
      // this.getUserPlaylists();
      // this.getUserTopTracks();
    } catch (error) {
      console.error('ERROR: Could not login user.', error);
    }
  };

  // getUserTopTracks = async () => {
  //   try {
  //     // Get a user's top tracks
  //     await spotifyWebApi.getMe();
  //     const data = await spotifyWebApi.getMyTopArtists();
  //     // console.log('Top Tracks: ', data);
  //     //this.setState({ topTracks });
  //   } catch (err) {
  //     console.error("ERROR: Could not retrieve user's playlists.", err);
  //   }
  // };

  getUserPlaylists = async () => {
    try {
      // Get a user's playlists
      const {
        body: { items: playlists },
      } = await spotifyWebApi.getUserPlaylists(this.state.user?.id);
      this.setState({ playlists });
    } catch (err) {
      console.error("ERROR: Could not retrieve user's playlists.", err);
    }
  };

  getSeedRecommendations = async () => {
    // Get Recommendations Based on Seeds
    const response = await spotifyWebApi.getRecommendations({
      min_energy: 0.4,
      min_popularity: 50,
    });
    console.log(
      'GET SEED RECOMMENDATIONS: ',
      JSON.stringify(response, null, 4),
    );
  };

  getAvailableGenreSeeds = async () => {
    // Get available genre seeds
    const { body: genreSeeds } = await spotifyWebApi.getAvailableGenreSeeds();
    this.setState({ genreSeeds });
  };

  setSelectedPlaylist = async (playlistData: any) => {
    this.setState({ currentSelectedPlaylist: playlistData });
  };

  setSelectedTracks = async (trackRecord: SelectedTrackRecord) => {
    this.setState({
      currentSelectedTracks: this.state.currentSelectedTracks.concat(
        trackRecord,
      ),
    });
  };

  authenticateSpotifyUser = async () => {
    const token = await authenticateSpotify() ;
    this.setState({
      token: token,
    });
  };
  render() {
    return (
      <SpotifyContext.Provider
        value={{
          authenticateSpotifyUser: this.authenticateSpotifyUser,
          currentSelectedPlaylist: this.state.currentSelectedPlaylist,
          currentSelectedTracks: this.state.currentSelectedTracks,
          getAvailableGenreSeeds: this.getAvailableGenreSeeds,
          getSeedRecommendations: this.getSeedRecommendations,
          isLoggedIn: this.state.isLoggedIn,
          login: this.login,
          playlists: this.state.playlists,
          recommendations: null,
          setSelectedPlaylist: this.setSelectedPlaylist,
          setSelectedTracks: this.setSelectedTracks,
          //topTracks: this.state.topTracks,
          user: this.state.user,
        }}
      >
        <div>{this.props.children}</div>
      </SpotifyContext.Provider>
    );
  }
}

export default SpotifyProvider;
