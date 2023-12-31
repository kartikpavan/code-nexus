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
  GetUserStatsParams,
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
    await User.findOneAndUpdate({ clerkId: clerkId }, updateData, { new: true });
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
    // Delete questions posted by the deleted user
    await Question.deleteMany({ author: user._id });
    // Delete questions posted by the deleted user
    await Question.deleteMany({ author: user._id });
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
    const { page = 1, pageSize = 20, filter, searchQuery } = params;
    // Calculate the number of users to skip based on the page Number and size
    const skip = pageSize * (page - 1);
    const query: FilterQuery<typeof User> = {};

    if (searchQuery) {
      query.$or = [
        { name: { $regex: new RegExp(searchQuery, "i") } },
        { username: { $regex: new RegExp(searchQuery, "i") } },
      ];
    }

    let sortOptions = {};
    switch (filter) {
      case "new_users":
        sortOptions = { joinedAt: -1 };
        break;
      case "old_users":
        sortOptions = { joinedAt: 1 };
        break;
      case "top_contributors":
        sortOptions = { respectScore: -1 };
        break;
      default:
        break;
    }

    const users = await User.find(query).skip(skip).limit(pageSize).sort(sortOptions);
    const totalUsers = await User.countDocuments(query);
    const isNext = totalUsers > skip + users.length;
    return { users, isNext };
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
      await User.findByIdAndUpdate(userId, { $addToSet: { savedPost: questionId } }, { new: true });
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
    // Calculate the number of posts to skip based on the pageNumber and pageSize
    const skip = pageSize * (page - 1);

    const query: FilterQuery<typeof Question> = {};
    if (searchQuery) {
      query.$or = [{ title: { $regex: new RegExp(searchQuery, "i") } }];
    }

    let sortOptions = {};
    switch (filter) {
      case "most_recent":
        sortOptions = { createdAt: -1 };
        break;
      case "oldest":
        sortOptions = { joinedAt: 1 };
        break;
      case "most_voted":
        sortOptions = { upvotes: -1 };
        break;
      case "most_viewed":
        sortOptions = { views: -1 };
        break;
      case "most_answered":
        sortOptions = { answers: -1 };
        break;
      default:
        break;
    }

    const user = await User.findOne({ clerkId }).populate({
      path: "savedPost",
      match: query,
      options: { sort: sortOptions, skip: skip, limit: pageSize + 1 },
      populate: [
        { path: "tags", model: Tag, select: "_id name" },
        { path: "author", model: User, select: "_id name clerkId picture" },
      ],
    });
    const isNext = user.savedPost.length > pageSize;
    if (!user) throw new Error("User not Found");

    const savedQuestions = await user.savedPost;

    return { questions: savedQuestions, isNext };
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
  }
}

//* Fetch User information to display in profile page
export async function getUserInformation(params: GetUserByIdParams) {
  try {
    connectToDb();
    const user = await User.findOne({ clerkId: params.userId });
    if (!user) throw new Error("User not found for getUserInformation method");
    //  total Question posted my user
    const totalQuestions = await Question.countDocuments({ author: user._id });
    //  total Answers posted my user
    const totalAnswers = await Answer.countDocuments({ author: user._id });

    return { user, totalQuestions, totalAnswers };
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
  }
}

export async function getUserQuestions(params: GetUserStatsParams) {
  try {
    connectToDb();
    const { userId, page = 1, pageSize = 10 } = params;
    const totalQuestions = await Question.countDocuments({ author: userId });
    const userQuestions = await Question.find({ author: userId })
      .sort({ createdAt: -1 })
      .populate("tags", "_id name")
      .populate("author", "_id clerkId name picture");

    return { totalQuestions, userQuestions };
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
  }
}

export async function GetUserAnswers(params: GetUserStatsParams) {
  try {
    connectToDb();
    const { userId, page = 1, pageSize = 10 } = params;
    const totalAnswers = await Answer.countDocuments({ author: userId });
    const userAnswers = await Answer.find({ author: userId })
      .populate("question", "_id title")
      .populate("author", "_id clerkId picture name");

    return { totalAnswers, userAnswers };
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
  }
}
