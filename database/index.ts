import mongoose from "mongoose";

let isConnected: boolean = false;

export async function connectToDb() {
  mongoose.set("strictQuery", true);
  if (!process.env.MONGO_URI) return console.log("Missing MONGO URL!");
  if (isConnected) return console.log("MONGODB already connected");
  try {
    await mongoose.connect(process.env.MONGO_URI, { dbName: "kartik" });
    isConnected = true;
    console.log("MONGO DB Connection successful");
  } catch (error) {
    if (error instanceof Error) console.log("MONGO DB connection failed");
  }
}
