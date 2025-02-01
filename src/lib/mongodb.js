import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {};

if (!uri) {
  throw new Error("❌ MongoDB URI is missing in .env.local");
}

const client = new MongoClient(uri, options);

const clientPromise = client.connect()
  .then((client) => {
    console.log("✅ MongoDB Connected Successfully!");
    return client;
  })
  .catch((error) => {
    console.error("❌ MongoDB Connection Failed:", error.message);
  });

export default clientPromise;
