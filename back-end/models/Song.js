import mongoose from 'mongoose';

const songSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Artist', required: true }],
  album: { type: mongoose.Schema.Types.ObjectId, ref: 'Album' },
  duration: { type: Number, required: true }, // in seconds
  audioFile: { type: String, default: '' },
  coverArt: { type: String, default: '' },
  lyrics: { type: String, default: '' },
  genre: { type: [String], required: true },
  mood: { type: [String], default: [] },
  plays: { type: Number, default: 0 },
  popularity: { type: Number, default: 0 },
  recordingDetails: {
    bpm: Number,
    key: String,
    instruments: [String]
  },
  isExplicit: { type: Boolean, default: false },
  streaming: {
    spotify: String,
    youtube: String,
    appleMusic: String
  },
  credits: [
    {
      role: String,
      name: String
} ] }, { timestamps: true });

export default mongoose.model('Song', songSchema);