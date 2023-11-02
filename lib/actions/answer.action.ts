"use server";

import { connectToDb } from "@/database";
import { CreateAnswerParams } from "./shared.types";
import Answer from "@/database/models/answer.model";
import Question from "@/database/models/question.model";
import { revalidatePath } from "next/cache";

export default async function createAnswer(params: CreateAnswerParams) {
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
