import mongoose from 'mongoose';

const albumSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: mongoose.Schema.Types.ObjectId, ref: 'Artist', required: true },
  releaseDate: { type: Date, required: true },
  coverArt: { type: String, default: '' },
  genre: { type: [String], required: true },
  type: { type: String, enum: ['album', 'ep', 'single'], default: 'album' },
  description: { type: String, default: '' },
  credits: [
    {
      role: String,
      name: String
    }
  ],
  recordingDetails: {
    studio: String,
    location: String,
    equipment: [String]
  },
  duration: { type: Number }, // in seconds
  copyright: { type: String, default: '' }
}, { timestamps: true });

export default mongoose.model('Album', albumSchema);