import mongoose from '../db';
import { Artist } from '../services/artist';

const { Schema } = mongoose;

export interface TrackDocument extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  album: any;
  artists: Array<any>;
  availableMarkets: Array<string>;
  duration: number;
  explicit: boolean;
  name: string;
  popularity: number;
  spotifyUri: string;
  trackNumber: number;
  type: string;
}

const TrackSchema = new Schema({
  album: {
    of: Schema.Types.Mixed,
    type: Object,
  },
  artists: {
    of: Schema.Types.ObjectId,
    type: Array,
  },
  availableMarkets: {
    of: String,
    type: Array,
  },
  duration: Number,
  explicit: Boolean,
  name: String,
  popularity: Number,
  spotifyUri: String,
  trackNumber: Number,
  type: String,
});

export const TrackModel = mongoose.model<TrackDocument>('Track', TrackSchema);