/* eslint-disable prettier/prettier */
import { MongoClient, ServerApiVersion } from 'mongodb';

export async function connectToMongoDB() {
  const uri = process.env.URL;

  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  try {
    await client.connect();
    console.log('Connected to MongoDB');
    return client;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}
