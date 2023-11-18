"use server";
import { connectToDb } from "@/database";
import {
  AnswerVoteParams,
  CreateAnswerParams,
  DeleteAnswerParams,
  GetAnswersParams,
} from "./shared.types";
import Answer from "@/database/models/answer.model";
import Question from "@/database/models/question.model";
import { revalidatePath } from "next/cache";
import Interaction from "@/database/models/interaction.model";
import User from "@/database/models/user.model";

export async function createAnswer(params: CreateAnswerParams) {
  try {
    connectToDb();
    const { content, author, question, path } = params;
    const newAnswer = await Answer.create({ content, author, question });
    // Answer needs to added to a particular question answer array
    const questionObject = await Question.findByIdAndUpdate(question, {
      $push: { answers: newAnswer._id },
    });
    // Interaction is for Recommendation System
    await Interaction.create({
      user: author,
      action: "answer",
      question: question,
      answer: newAnswer._id,
      tags: questionObject.tags,
    });
    // Reputation is for Badge System
    await User.findByIdAndUpdate(author, { $inc: { respectScore: 10 } });
    revalidatePath(path); // refreshes the question detail page
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
  }
}

export async function getAnswers(params: GetAnswersParams) {
  try {
    connectToDb();
    const { questionId, filter, page = 1, pageSize = 5 } = params;
    // Calculate the amount of answers to skip based on the pageNumber and pageSize
    const skip = pageSize * (page - 1);
    let sortOptions = {};
    switch (filter) {
      case "highestupvotes":
        sortOptions = { upvotes: -1 };
        break;
      case "lowestupvotes":
        sortOptions = { upvotes: 1 };
        break;
      case "recent":
        sortOptions = { createdAt: -1 };
        break;
      case "old":
        sortOptions = { createdAt: 1 };
        break;
      default:
        break;
    }

    const answers = await Answer.find({ question: questionId })
      .populate("author", "_id clerkId name picture")
      .skip(skip)
      .limit(pageSize)
      .sort(sortOptions);
    const answerCount = await Answer.countDocuments({ question: questionId });

    const isNext = answerCount > answers.length + skip;

    return { answers, isNext };
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
      updateQuery = {
        $pull: { downvotes: userId },
        $push: { upvotes: userId },
      };
    } else {
      // If we havent upvoted or downvoted
      updateQuery = { $addToSet: { upvotes: userId } };
    }
    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, {
      new: true,
    });
    if (!answer) throw new Error("Answer not found");
    //User who will upvote will get +2 Points
    await User.findByIdAndUpdate(userId, {
      $inc: { respectScore: hasupVoted ? -2 : 2 },
    });
    // Author whoose answer will get upvote will get +10 points
    await User.findByIdAndUpdate(answer.author, {
      $inc: { respectScore: hasupVoted ? -10 : 10 },
    });
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
      updateQuery = {
        $pull: { upvotes: userId },
        $push: { downvotes: userId },
      };
    } else {
      // If we havent upvoted or downvoted
      updateQuery = { $addToSet: { downvotes: userId } };
    }
    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, {
      new: true,
    });
    if (!answer) throw new Error("Answer not found");

    //User who will downvote will get 10 Points
    await User.findByIdAndUpdate(userId, {
      $inc: { respectScore: hasdownVoted ? -2 : 2 },
    });
    // Author whoose answer will get upvote will get -10 points
    await User.findByIdAndUpdate(answer.author, {
      $inc: { respectScore: hasdownVoted ? -10 : 10 },
    });
    revalidatePath(path);
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
  }
}

//! Delete Answer
export async function deleteAnswer(params: DeleteAnswerParams) {
  try {
    connectToDb();
    const { answerId, path } = params;
    // Delete the answer
    const answer = await Answer.findById(answerId);
    if (!answer) throw new Error("answer Not found to delete");
    // Delete answer, views , upvotes and other interactions
    await Answer.deleteOne({ _id: answerId });
    await Interaction.deleteMany({ answer: answerId });
    await Question.updateMany({ _id: answer.question }, { $pull: { answers: answerId } });
    revalidatePath(path);
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
  }
}
