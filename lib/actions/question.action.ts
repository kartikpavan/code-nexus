"use server";
import { connectToDb } from "@/database";
import Question from "@/database/models/question.model";
import Tag from "@/database/models/tag.model";
import {
  CreateQuestionParams,
  GetQuestionByIdParams,
  GetQuestionsParams,
  QuestionVoteParams,
} from "./shared.types";
import User from "@/database/models/user.model";
import { revalidatePath } from "next/cache";

//! Get Questions (Dynamic route)
export async function getQuestions(params: GetQuestionsParams) {
  try {
    connectToDb();
    const questions = await Question.find({})
      .populate({ path: "tags", model: Tag })
      .populate({ path: "author", model: User })
      .sort({ createdAt: -1 });
    return { questions };
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
  }
}

//! Post a Question
export async function createQuestion(params: CreateQuestionParams) {
  try {
    connectToDb();
    const { title, author, content, tags, path } = params;
    console.log(author);
    // Creating and saving question inside DB
    const question = await Question.create({
      title,
      content,
      author,
    });

    const tagDocument = [];
    // loop through incoming tags
    for (let tag of tags) {
      // Check for existing tag and associate the question id to it
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, "i") } }, // finding the tag with name
        { $setOnInsert: { name: tag }, $push: { question: question._id } }, // update to perform if the document is found or inserted
        { upsert: true, new: true } // if no doc is found then insert new doc with specified update and return the new document.
      );
      tagDocument.push(existingTag._id);
    }

    await Question.findByIdAndUpdate(question._id, { $push: { tags: { $each: tagDocument } } });
    revalidatePath(path);
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
  }
}

//! Get Details of a question
export async function getQuestionById(params: GetQuestionByIdParams) {
  try {
    connectToDb();
    const question = await Question.findById(params.questionId)
      .populate({
        path: "tags",
        model: Tag,
        select: "_id name",
      })
      .populate({
        path: "author",
        model: User,
        select: "_id name clerkId picture",
      });
    return question;
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
  }
}

//! Upvote
export async function upvoteQuestion(params: QuestionVoteParams) {
  try {
    connectToDb();
    const { questionId, userId, hasdownVoted, hasupVoted, path } = params;
    let updateQuery = {};
    if (hasupVoted) {
      //if we have already upvoted then we need to remove that upvote on toggle
      updateQuery = { $pull: { upvotes: userId } };
    } else if (hasdownVoted) {
      // If we have already downvoted, remove from downvote array and push into upvote array
      updateQuery = { $pull: { downvotes: userId }, $push: { upvotes: userId } };
    } else {
      // If we havent upvoted or downvoted
      updateQuery = { $addToSet: { upvotes: userId } };
    }
    const question = await Question.findByIdAndUpdate(questionId, updateQuery, { new: true });
    if (!question) throw new Error("Question not found");
    // TODO: Author will get +10 Points for every upvotes he gets
    revalidatePath(path);
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
  }
}

//! Downvote
export async function downvoteQuestion(params: QuestionVoteParams) {
  try {
    connectToDb();
    const { questionId, userId, hasdownVoted, hasupVoted, path } = params;

    let updateQuery = {};
    if (hasdownVoted) {
      // if we have already downvoted then we need to remove that downvote on toggle
      updateQuery = { $pull: { downvotes: userId } };
    } else if (hasupVoted) {
      updateQuery = { $pull: { upvotes: userId }, $push: { downvotes: userId } };
    } else {
      // If we havent upvoted or downvoted
      updateQuery = { $addToSet: { downvotes: userId } };
    }
    const question = await Question.findByIdAndUpdate(questionId, updateQuery, { new: true });
    if (!question) throw new Error("Question not found");

    // TODO: Author will get +10 Points for every upvotes he gets
    revalidatePath(path);
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
  }
}
