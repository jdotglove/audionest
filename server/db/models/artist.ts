import mongoose from '../db';

const { Schema } = mongoose;

export interface ArtistDocument extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  genres: Array<any>;
  popularity: number;
  spotifyUri: string;
  type: string;
}

const ArtistSchema = new Schema({
  name: String,
  genres: Array,
  popularity: Number,
  spotifyUri: String,
  type: String,
});

export const ArtistModel = mongoose.model<ArtistDocument>('Artist', ArtistSchema);