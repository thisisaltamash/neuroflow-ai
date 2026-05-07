import mongoose from "mongoose";

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  var mongooseCache: MongooseCache | undefined;
}

const MONGODB_URI = process.env.MONGODB_URI;

let cached = global.mongooseCache;

if (!cached) {
  cached = { conn: null, promise: null };
  global.mongooseCache = cached;
}

export async function connectDB() {
  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not configured.");
  }

  if (cached?.conn) return cached.conn;

  if (!cached?.promise) {
    mongoose.set("strictQuery", true);
    cached!.promise = mongoose.connect(MONGODB_URI, {
      dbName: process.env.MONGODB_DB,
      maxPoolSize: 12,
      minPoolSize: 2,
      serverSelectionTimeoutMS: 10000
    });
  }

  cached!.conn = await cached!.promise;
  return cached!.conn;
}
