import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // hashed
  avatar: { type: String, default: '' },
  bio: { type: String, default: '' },
  playlists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Playlist' }],
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  isVerified: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model('User', userSchema);