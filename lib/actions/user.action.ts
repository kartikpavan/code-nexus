"use server";
import { connectToDb } from "@/database";
import Question from "@/database/models/question.model";
import User from "@/database/models/user.model";
import { revalidatePath } from "next/cache";
import {
   CreateUserParams,
   DeleteUserParams,
   GetAllUsersParams,
   GetSavedQuestionsParams,
   GetUserByIdParams,
   ToggleSaveQuestionParams,
   UpdateUserParams,
} from "./shared.types";
import Tag from "@/database/models/tag.model";
import { FilterQuery } from "mongoose";
import Answer from "@/database/models/answer.model";

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

//* Save a post to DB
export async function savePost(params: ToggleSaveQuestionParams) {
   try {
      connectToDb();
      const { questionId, userId, path } = params;
      const user = await User.findById(userId);
      if (!user) throw new Error("No user found");
      // check if the question is already saved
      const isQuestionSaved = user.savedPost.includes(questionId);
      // if question is already saved remove the question else insert the question
      if (isQuestionSaved) {
         await User.findByIdAndUpdate(userId, { $pull: { savedPost: questionId } }, { new: true });
      } else {
         await User.findByIdAndUpdate(
            userId,
            { $addToSet: { savedPost: questionId } },
            { new: true }
         );
      }
      revalidatePath(path);
   } catch (error) {
      if (error instanceof Error) console.log(error.message);
   }
}

//* Fetch saved Post to display
export async function getSavedPosts(params: GetSavedQuestionsParams) {
   try {
      connectToDb();
      const { clerkId, page = 1, pageSize = 10, filter, searchQuery } = params;
      const query: FilterQuery<typeof Question> = searchQuery
         ? { title: { $regex: new RegExp(searchQuery, "i") } }
         : {};
      const user = await User.findOne({ clerkId }).populate({
         path: "savedPost",
         match: query,
         options: { sort: { createdAt: -1 } },
         populate: [
            { path: "tags", model: Tag, select: "_id name" },
            { path: "author", model: User, select: "_id name clerkId picture" },
         ],
      });
      if (!user) throw new Error("User not Found");

      const savedQuestions = await user.savedPost;
      return { questions: savedQuestions };
   } catch (error) {
      if (error instanceof Error) console.log(error.message);
   }
}

//* Fetch User information to display in profile page
export async function getUserInformation(params: GetUserByIdParams) {
   try {
      connectToDb();
      const user = await User.findOne({ clerkId: params.userId });
      if (!user) throw new Error("User not found for getUserInformation method in server Action");
      //  total Question posted my user
      const totalQuestions = await Question.countDocuments({ author: user._id });
      //  total Answers posted my user
      const totalAnswers = await Answer.countDocuments({ author: user._id });

      return { user, totalQuestions, totalAnswers };
   } catch (error) {
      if (error instanceof Error) console.log(error.message);
   }
}
