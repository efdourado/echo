import mongoose from 'mongoose';
import 'dotenv/config';

import './artists.js';
import './albums.js';
import './songs.js';
import './playlists.js';

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Seeding completed.'))
  .catch((err) => console.error('Seeding failed:', err));