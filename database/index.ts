import mongoose from "mongoose";

let isConnected: boolean = false;

export async function connectToDb() {
  mongoose.set("strictQuery", true);
  // Check if Mong URL is present
  if (!process.env.MONGO_URI) return console.log("Missing MONGO URL!");
  // Check if MONGO DB is already connected
  if (isConnected) return console.log("MONGODB already connected");
  // Connect to MONGO DB
  try {
    await mongoose.connect(process.env.MONGO_URI, { dbName: "codeNexus" });
    isConnected = true;
    console.log("MONGO DB Connection successful");
  } catch (error) {
    if (error instanceof Error) console.log("MONGO DB connection failed");
  }
}
