"use server";

import { connectToDb } from "@/database";
import User from "@/database/models/user.model";

export async function getUser(userId: string | number) {
  try {
    connectToDb();
    const user = await User.findOne({ clerkId: userId });
    return user;
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
  }
}
