"use server";
import { connectToDb } from "@/database";
import { AnswerVoteParams, CreateAnswerParams, GetAnswersParams } from "./shared.types";
import Answer from "@/database/models/answer.model";
import Question from "@/database/models/question.model";
import { revalidatePath } from "next/cache";

export async function createAnswer(params: CreateAnswerParams) {
   try {
      connectToDb();
      const { content, author, question, path } = params;
      const newAnswer = await Answer.create({ content, author, question });
      // Answer needs to added to a particular question answer array
      await Question.findByIdAndUpdate(question, { $push: { answers: newAnswer._id } });
      revalidatePath(path); // refreshes the question detail page
   } catch (error) {
      if (error instanceof Error) console.log(error.message);
   }
}

export async function getAnswers(params: GetAnswersParams) {
   try {
      connectToDb();
      const { questionId } = params;
      const answers = await Answer.find({ question: questionId })
         .populate("author", "_id clerkId name picture")
         .sort({ createdAt: -1 });
      return { answers };
   } catch (error) {
      if (error instanceof Error) console.log(error.message);
   }
}

//! Upvote
export async function upvoteAnswer(params: AnswerVoteParams) {
   try {
      connectToDb();
      const { answerId, userId, hasdownVoted, hasupVoted, path } = params;
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
      const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, { new: true });
      if (!answer) throw new Error("Answer not found");
      // TODO: Author will get +10 Points for every upvotes he gets
      revalidatePath(path);
   } catch (error) {
      if (error instanceof Error) console.log(error.message);
   }
}

//! Downvote
export async function downvoteAnswer(params: AnswerVoteParams) {
   try {
      connectToDb();
      const { answerId, userId, hasdownVoted, hasupVoted, path } = params;

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
      const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, { new: true });
      if (!answer) throw new Error("Answer not found");

      // TODO: Author will get +10 Points for every upvotes he gets
      revalidatePath(path);
   } catch (error) {
      if (error instanceof Error) console.log(error.message);
   }
}
