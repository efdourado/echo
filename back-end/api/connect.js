import dotenv from "dotenv";
dotenv.config();
import { MongoClient } from "mongodb";

const URI = process.env.MONGODB_URI;
const client = new MongoClient(URI);

export const db = client.db("echoData");