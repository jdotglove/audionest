import mongoose from '../db';
import { Artist } from '../services/artist';

const { Schema } = mongoose;

export interface AlbumDocument extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  albumType: string;
  artists: Array<any>;
  availableMarkets: Array<string>;
  name: string;
  releaseDate: string;
  releaseDatePercision: string;
  spotifyUri: string;
  totalTracks: number;
  type: string;
}

const AlbumSchema = new Schema({
  albumType: String,
  artists: {
    of: Schema.Types.ObjectId,
    type: Array,
  },
  availableMarkets: {
    of: String,
    type: Array,
  },
  name: String,
  releaseDate: String,
  releaseDatePercision: String,
  spotifyUri: String,
  totalTracks: Number,
  type: String,
});

export const AlbumModel = mongoose.model<AlbumDocument>('Album', AlbumSchema);