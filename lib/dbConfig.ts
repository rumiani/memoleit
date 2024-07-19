import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

export const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return mongoose.connection.asPromise();
  }

  try {
    const connection = await mongoose.connect(MONGODB_URI);
    connection.connection.on('connected', () => {
      console.log('MongoDB connected');
    });
    connection.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
    });
    connection.connection.on('reconnected', () => {
      console.log('MongoDB reconnected');
    });
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};
