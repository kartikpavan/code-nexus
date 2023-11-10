"use server";

import { connectToDb } from "@/database";
import { ViewQuestionParams } from "./shared.types";
import Question from "@/database/models/question.model";
import Interaction from "@/database/models/interaction.model";

export async function viewFunction(params: ViewQuestionParams) {
  try {
    connectToDb();
    const { questionId, userId } = params;
    // Update view count for current question
    await Question.findByIdAndUpdate(questionId, { $inc: { views: 1 } });
    // Check if user already viewed question
    if (userId) {
      const alreadyViewed = await Interaction.findOne({
        user: userId,
        action: "view",
        question: questionId,
      });
      if (alreadyViewed) return console.log("User already viewed this question once");
      // if not viewed
      await Interaction.create({
        user: userId,
        action: "view",
        question: questionId,
      });
    }
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
  }
}
