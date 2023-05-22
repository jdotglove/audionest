import axios from 'axios';
import React from 'react';

import { getURLHash } from '../utils/spotify';
import { SelectedTrackRecord, SpotifyProviderProps, SpotifyProviderState } from '../../types';
import SpotifyContext from '../contexts/SpotifyContext';
import { authenticateSpotify } from '../middleware/spotify';
// credentials are optional

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
    console.log('Mounted In Provider!');
    // @ts-ignore
    const accessToken = (await getURLHash()).access_token;
    console.log('Get URL Hash: ', accessToken);
    if (accessToken && !this.state.isLoggedIn) {
      this.login(accessToken);
    }
  }

  login = async (accessToken: string) => {
    try {
      const fetchUrl = `${process.env.NEXT_PUBLIC_BASE_API_URL}/user/login`;
      const response = await axios({
        url: fetchUrl,
        method: 'post',
        headers: {
          authorization: process.env.NEXT_PUBLIC_SERVER_API_KEY,
          'Content-Type': 'application/json',
        },
        data: JSON.stringify({
          token: accessToken,
        }),
      });
      console.log('Login Response: ', response)
      this.setState({ user: { ...response.data }, isLoggedIn: true, token: accessToken});
    } catch (error) {
      console.error('ERROR: Could not login user.', error);
    }
  };

  getUserTopTracks = async () => {
    try {
      console.log('Here In Get User Top Tracks');
      // Get a user's top tracks
      // await spotifyWebApi.getMe();
      // const data = await spotifyWebApi.getMyTopArtists();
      // console.log('Top Tracks: ', data);
      //this.setState({ topTracks });
    } catch (err) {
      console.error("ERROR: Could not retrieve user's playlists.", err);
    }
  };

  getUserPlaylists = async () => {
    try {
      // Get a user's playlists
      // const result = await fetch('https://api.spotify.com/v1/users/{}', {
      //   method: 'GET', headers: { Authorization: `Bearer ${accessToken}` },
      // });
      // const parsedUser = {
      //   ...(await result.json()),
      // };
      // // const {
      // //   body: { items: playlists },
      // // } = await spotifyWebApi.getUserPlaylists(this.state.user?.id);
      // this.setState({ playlists });
    } catch (err) {
      console.error("ERROR: Could not retrieve user's playlists.", err);
    }
  };

  getSeedRecommendations = async () => {
    // Get Recommendations Based on Seeds
    // const response = await spotifyWebApi.getRecommendations({
    //   min_energy: 0.4,
    //   min_popularity: 50,
    // });
    // console.log(
    //   'GET SEED RECOMMENDATIONS: ',
    //   JSON.stringify(response, null, 4),
    // );
  };

  getAvailableGenreSeeds = async () => {
    // Get available genre seeds
    // const { body: genreSeeds } = await spotifyWebApi.getAvailableGenreSeeds();
    // this.setState({ genreSeeds });
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
          topTracks: this.state.topTracks,
          user: this.state.user,
        }}
      >
        <div>{this.props.children}</div>
      </SpotifyContext.Provider>
    );
  }
}

export default SpotifyProvider;
