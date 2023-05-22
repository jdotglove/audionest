import { findOneUserAndUpdate, User } from '../../../db/services/user';
import { redisClientDo } from '../../../redis';
import {
  resolveArtistsInDatabase,
  translateSpotifyTrackObject,
  translateSpotifyUserObject,
  translateSpotifyUserPlaylistObject,
} from '../../../utils/spotify';
import axios from 'axios';
import { findOnePlaylistAndUpdate, Playlist } from '../../../db/services/playlist';
import { findOneTrackAndUpdate } from '../../../db/services/track';

export const getUserPlaylists = async (req: any, res: any) => {
  let playlists: Playlist[];
  try {
    const { data: spotifyUserPlaylists } = await axios({
      method: 'get',
      url: `https://api.spotify.com/v1/users/${req.body.spotifyUserId}/playlists`,
      headers: { Authorization: `Bearer ${req.body.token}` }
    });
    const databasePlaylistObjectArray = translateSpotifyUserPlaylistObject(spotifyUserPlaylists);
    playlists = await Promise.all(databasePlaylistObjectArray.map(async (playlistObject) => {
      const playlist = await findOnePlaylistAndUpdate({
        spotifyUri: playlistObject.spotifyUri,
      }, {
        $set: playlistObject,
      }, {
        returnNewDocument: true,
        upsert: true,
      });
      await redisClientDo('set', `${playlist.spotifyUri}`, JSON.stringify(playlist));
      return playlist;
    }));
    if (!playlists || playlists.length === 0) {
      res.status(404).send('Playlists Not Found').end();
      return;
    } else {
      res.status(200).send(playlists).end();
    }
  } catch (error: any) {
    console.error('Error retrieving playlists: ', error.message);
    res.status(500).send(error.message).end();
  }
  return;
};

export const loginUser = async (req: any, res: any) => {
  let user: User;
  try {
    const { data: spotifyUser } = await axios({
      method: 'get',
      url: 'https://api.spotify.com/v1/me',
      headers: { Authorization: `Bearer ${req.body.token}` }
    });
    const { data: spotifyUserTopTracks } = await axios({
      method: 'get',
      url: 'https://api.spotify.com/v1/me/top/tracks',
      headers: { Authorization: `Bearer ${req.body.token}` }
    });
    const { data: spotifyUserTopArtists } = await axios({
      method: 'get',
      url: 'https://api.spotify.com/v1/me/top/artists',
      headers: { Authorization: `Bearer ${req.body.token}` }
    });
    const databaseUserObject = translateSpotifyUserObject(spotifyUser);
    console.log('Top Artists: ', spotifyUserTopArtists);
    // console.log('Top Track: ', spotifyUserTopTracks.items);
    const userTopArtists = await resolveArtistsInDatabase(spotifyUserTopArtists.items);
    const userTopTracks = await Promise.all(spotifyUserTopTracks.items.map(async (track: any) => {
      const databaseTrackObject = await translateSpotifyTrackObject(track);
      const savedTopTrack = await findOneTrackAndUpdate({
        spotifyUri: databaseTrackObject.spotifyUri,
      }, {
        $set: databaseTrackObject,
      }, {
        returnNewDocument: true,
        upsert: true,
      });
      
      return savedTopTrack;
    }));
    user = await findOneUserAndUpdate({
      spotifyUri: databaseUserObject.spotifyUri,
    }, {
      $set: {
        ...databaseUserObject,
        topArtists: userTopArtists,
        topTracks: userTopTracks.map(({ _id }) => _id),
      },
    }, {
      returnNewDocument: true,
      upsert: true,
    });
    if (!user || !user.spotifyUri) {
      res.status(404).send('User Not Found').end();
    } else {
      await redisClientDo('set', `${user.spotifyUri}`, JSON.stringify(user));
      res.status(200).send(user).end();
    }
  } catch (error: any) {
    console.error('Error Logging in user: ', error.message);
    res.status(500).send(error.message).end();
  }
  return;
};