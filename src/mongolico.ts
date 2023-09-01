import { MongoClient, ServerApiVersion } from 'mongodb';

export async function connectToMongoDB() {
  const uri = "mongodb+srv://jharoldm:t0SDvIdssmU1q3gT@pokegatos.qrspmc9.mongodb.net/?retryWrites=true&w=majority";

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
