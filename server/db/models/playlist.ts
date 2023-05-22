import mongoose from '../db';

const { Schema } = mongoose;

export interface PlaylistDocument extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  owner: any;
  spotifyUri: string;
  tracks: Array<any>;
  type: string;
}

const PlaylistSchema = new Schema({
  name: String,
  owner: Object,
  spotifyUri: String,
  tracks: Array,
  type: String,
});

export const PlaylistModel = mongoose.model<PlaylistDocument>('Playlist', PlaylistSchema);