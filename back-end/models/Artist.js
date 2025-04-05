import mongoose from 'mongoose';

const artistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, default: '' },
  banner: { type: String, default: '' },
  description: { type: String, required: true },
  monthlyListeners: { type: Number, default: 0 },
  followers: { type: Number, default: 0 },
  genre: { type: [String], required: true },
  socials: {
    instagram: String,
    twitter: String,
    youtube: String,
    tiktok: String
  },
  verified: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('Artist', artistSchema);