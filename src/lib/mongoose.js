import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI is missing in environment variables');
}

const globalForMongoose = global;

let cached = globalForMongoose.mongoose;
if (!cached) {
  cached = globalForMongoose.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('✅ Connected to MongoDB');
      return mongoose;
    }).catch(err => {
      console.error('❌ MongoDB Connection Error:', err);
      throw err;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
