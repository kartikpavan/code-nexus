"use server";
import { connectToDb } from "@/database";
import Question from "@/database/models/question.model";
import Tag from "@/database/models/tag.model";
import { CreateQuestionParams, GetQuestionsParams } from "./shared.types";
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
  } catch (error) {}
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
