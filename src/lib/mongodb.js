import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error('Please add your MongoDB URI to .env.local');
}

let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
  // Reuse connection in dev mode (to avoid hot reload issues)
  if (!global._mongoClient) {
    client = new MongoClient(uri);
    global._mongoClient = client.connect();
  }
  clientPromise = global._mongoClient;
} else {
  // Always create a new connection in production
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export async function connectToDatabase() {
  const client = await clientPromise;
  const db = client.db('todoapp'); // 🔁 Use your DB name here
  return { client, db };
}
