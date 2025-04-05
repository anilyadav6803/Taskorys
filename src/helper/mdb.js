import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGO_DB_URI);
const clientPromise = client.connect();

export default clientPromise;
