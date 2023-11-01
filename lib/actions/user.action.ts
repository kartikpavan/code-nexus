"use server";

import { connectToDb } from "@/database";
import Question from "@/database/models/question.model";
import User from "@/database/models/user.model";
import { revalidatePath } from "next/cache";
import {
  CreateUserParams,
  DeleteUserParams,
  GetAllUsersParams,
  UpdateUserParams,
} from "./shared.types";

//* Get single User
export async function getUser(userId: string) {
  try {
    connectToDb();
    const user = await User.findOne({ clerkId: userId });
    return user;
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
  }
}

//* Create User (Webhook)
export async function createUser(userData: CreateUserParams) {
  try {
    connectToDb();
    const newUser = await User.create(userData);
    return newUser;
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
  }
}

//* Update User (Webhook)
export async function updateUser(userData: UpdateUserParams) {
  try {
    connectToDb();
    const { clerkId, updateData, path } = userData;
    await User.findOneAndUpdate({ clerkId }, updateData, { new: true });
    revalidatePath(path);
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
  }
}

//* Delete User (Webhook)
export async function deleteUser(clerkId: DeleteUserParams) {
  try {
    connectToDb();
    const user = await User.findOneAndDelete({ clerkId: clerkId });
    if (!user) throw new Error("User not found hence cannot delete");
    // Delete those questions posted by deleted user
    await Question.deleteMany({ author: user._id });
    // Get Qestion id's associated with the user
    const questionId = await Question.find({ author: user._id }).distinct("_id");
    // TODO: delete questions ,answers and comments etc

    // Finally Delete the user
    const deletedUser = await User.findByIdAndDelete(user._id);
    return deletedUser;
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
  }
}

//* Get all Users
export async function getAllUsers(params: GetAllUsersParams) {
  try {
    connectToDb();
    // const { page = 1, pageSize = 20, filter, searchQuery } = params;
    const users = await User.find({}).sort({ createdAt: -1 });
    return { users };
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
  }
}
