"use server";
import { connectToDb } from "@/database";
import Question from "@/database/models/question.model";
import Tag from "@/database/models/tag.model";
import {
  CreateQuestionParams,
  DeleteQuestionParams,
  EditQuestionParams,
  GetQuestionByIdParams,
  GetQuestionsParams,
  QuestionVoteParams,
} from "./shared.types";
import User from "@/database/models/user.model";
import { revalidatePath } from "next/cache";
import Answer from "@/database/models/answer.model";
import Interaction from "@/database/models/interaction.model";
import { FilterQuery } from "mongoose";

//! Get Questions (Dynamic route)
export async function getQuestions(params: GetQuestionsParams) {
  try {
    connectToDb();
    const { searchQuery, filter, page = 1, pageSize = 10 } = params;
    // Calculate the number of post to skip based on the page number and size
    const skip = (page - 1) * pageSize;
    // Check for query Params
    const query: FilterQuery<typeof Question> = {};
    // If there is is search query then search it with title
    if (searchQuery) {
      query.$or = [{ title: { $regex: new RegExp(searchQuery, "i") } }];
    }

    let sortOptions = {};
    switch (filter) {
      case "newest":
        sortOptions = { createdAt: -1 };
        break;
      case "frequent":
        sortOptions = { views: -1 };
        break;
      case "unanswered":
        query.answers = { $size: 0 };
        break;
      case "recommended":
        break;
      default:
        break;
    }

    const questions = await Question.find(query)
      .populate({ path: "tags", model: Tag })
      .populate({ path: "author", model: User })
      .skip(skip)
      .limit(pageSize)
      .sort(sortOptions);

    // Check if next Page Exists to show more results
    const totalQuestions = await Question.countDocuments(query);
    // if we have 100 ques, and have skipped 4 pages of 20 and we have 20 on last page
    const isNext = totalQuestions > skip + questions.length;

    return { questions, isNext };
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

    // Create the tag or get them if they already exists
    const tagDocuments = [];
    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, "i") } },
        { $setOnInsert: { name: tag }, $push: { questions: question._id } }, // update to perform if the document is found or inserted
        { upsert: true, new: true } // if no doc is found then insert new doc with specified update and return the new document.
      );
      tagDocuments.push(existingTag._id);
    }

    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocuments } },
    });
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
      updateQuery = {
        $pull: { downvotes: userId },
        $push: { upvotes: userId },
      };
    } else {
      // If we havent upvoted or downvoted
      updateQuery = { $addToSet: { upvotes: userId } };
    }
    const question = await Question.findByIdAndUpdate(questionId, updateQuery, {
      new: true,
    });
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
      updateQuery = {
        $pull: { upvotes: userId },
        $push: { downvotes: userId },
      };
    } else {
      // If we havent upvoted or downvoted
      updateQuery = { $addToSet: { downvotes: userId } };
    }
    const question = await Question.findByIdAndUpdate(questionId, updateQuery, {
      new: true,
    });
    if (!question) throw new Error("Question not found");

    // TODO: Author will get +10 Points for every upvotes he gets
    revalidatePath(path);
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
  }
}

//! Delete question
export async function deleteQuestion(params: DeleteQuestionParams) {
  try {
    connectToDb();
    const { questionId, path } = params;
    // Delete the question
    await Question.deleteOne({ _id: questionId });
    // Delete all answers associated with the question
    await Answer.deleteMany({ question: questionId });
    // Delete all Interactions like views, upvotes , likes etc
    await Interaction.deleteMany({ question: questionId });
    // Update tags to remove the refrence of the deleted question
    await Tag.updateMany({ questions: questionId }, { $pull: { questions: questionId } });
    revalidatePath(path);
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
  }
}

//! Edit Question
export async function editQuestion(params: EditQuestionParams) {
  try {
    connectToDb();
    const { questionId, path, content, title } = params;
    const question = await Question.findById(questionId).populate("tags");
    if (!question) throw new Error("Question not found to edit");
    question.title = title;
    question.content = content;
    // We are not giving the power to update the tag as the logic will be very complicated
    await question.save();
    revalidatePath(path);
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
  }
}

export async function getTopQuestions() {
  try {
    connectToDb();
    const questions = await Question.find({}).sort({ views: -1, upvotes: -1 }).limit(5);
    return questions;
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
  }
}
