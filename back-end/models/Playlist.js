import mongoose from 'mongoose';

const playlistSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  coverArt: { type: String, default: '' },
  isPublic: { type: Boolean, default: true },
  songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }],
  subPlaylists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Playlist' }],
  tags: [String],
  duration: { type: Number, default: 0 }, // in seconds
  followers: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model('Playlist', playlistSchema);
