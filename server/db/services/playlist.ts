import { PlaylistModel, PlaylistDocument } from '../models/playlist';

export const findOnePlaylistAndUpdate = (
  query: any,
  update: any,
  options?: any,
): Promise<Playlist> => PlaylistModel.findOneAndUpdate(
  query,
  update,
  options,
) as unknown as Promise<Playlist>;

export const updateManyPlaylists = (
  query: any,
  update: any,
  options?: any,
): Promise<Playlist[]> => PlaylistModel.updateMany(
  query,
  update,
  options,
) as unknown as Promise<Playlist[]>;

export type Playlist = PlaylistDocument;