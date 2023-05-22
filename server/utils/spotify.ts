import { findOneArtistAndUpdate } from "../db/services/artist";

export const translateSpotifyUserObject = ({
  country,
  display_name: displayName,
  email,
  uri: spotifyUri,
}: {
  country: string,
  display_name: string,
  email: string,
  uri: string,
}) => ({
  country,
  displayName,
  email,
  spotifyUri,
  topArtists: [],
  topTracks: [],
});

export const translateSpotifyUserPlaylistObject = (playlistArray: Array<any>) => (
  playlistArray.map(({
    country,
    name,
    owner,
    uri: spotifyUri,
  }) => ({
    country,
    name,
    owner,
    spotifyUri,
  })
));

export const translateSpotifyTrackObject = async ({
  album,
  artists,
  available_markets: availableMarkets,
  duration,
  explicit,
  name,
  popularity,
  track_number: trackNumber,
  type,
  uri: spotifyUri,
}: {
  album: any,
  artists: Array<any>,
  available_markets: Array<any>,
  duration: number,
  explicit: boolean,
  name: string,
  popularity: number,
  track_number: number,
  type: string,
  uri: string,
}) => {
  const resolvedArtists = await resolveArtistsInDatabase(artists);
  return {
    album,
    artists: resolvedArtists,
    availableMarkets,
    duration,
    explicit,
    name,
    popularity,
    trackNumber,
    type,
    spotifyUri,
  }
};

export const resolveArtistsInDatabase = async (artists: Array<any>) => {
  const artistArray = await Promise.all(artists.map(async ({
    genres,
    name,
    popularity,
    uri: spotifyUri
  }) => {
    const savedArtist = await findOneArtistAndUpdate({
      spotifyUri: spotifyUri,
    }, {
      genres,
      name,
      popularity,
      spotifyUri,
    }, {
      returnNewDocument: true,
      upsert: true,
    });
    console.log('Saved Artist: ', savedArtist)
    return savedArtist._id;
  }));
  return artistArray;
}