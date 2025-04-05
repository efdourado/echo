import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('mongoDB connected successfully');
  } catch (error) {
    console.error('mongoDB connection error:', error);
    process.exit(1);
} };

export default connectDB;