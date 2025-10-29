import { Db, MongoClient } from "mongodb";

const uri: string = process.env.MONGODB_URI!;
const dbName: string = process.env.MONGODB_DB!;

declare global {
  // avoid multiple connection in dev mode
  var _mongoClientPromise: Promise<MongoClient>;
}

const clientPromise: Promise<MongoClient> =
  global._mongoClientPromise || new MongoClient(uri).connect();

// store it globally in dev for hot reloads
if (process.env.NODE_ENV !== "production") {
  global._mongoClientPromise = clientPromise;
}

export async function getDB(): Promise<Db> {
  const client = await clientPromise;
  return client.db(dbName);
}

export default clientPromise;
