"use server";

import { connectToDb } from "@/database";
import { SearchParams } from "./shared.types";
import Question from "@/database/models/question.model";
import Answer from "@/database/models/answer.model";
import User from "@/database/models/user.model";
import Tag from "@/database/models/tag.model";

const validTypes = ["question", "tag", "answer", "user"];

export async function globalSearch(params: SearchParams) {
  try {
    connectToDb();
    const { query, typeOfSearch } = params;
    const ModelAndTypes = [
      { model: Question, searchField: "title", type: "question" },
      { model: Answer, searchField: "content", type: "answer" },
      { model: User, searchField: "name", type: "user" },
      { model: Tag, searchField: "name", type: "tag" },
    ];

    let results: any = [];
    const regexQuery = { $regex: query, $options: "i" };

    if (!typeOfSearch || !validTypes.includes(typeOfSearch)) {
      // If no type is selected then everything will be searched
      for (const { model, searchField, type } of ModelAndTypes) {
        const queryResults = await model.find({ [searchField]: regexQuery }).limit(2);
        results.push(
          ...queryResults.map((item) => ({
            title: typeOfSearch === "answer" ? `Answers containing ${query}` : item[searchField],
            type: type,
            id:
              typeOfSearch === "user"
                ? item.clerkId
                : typeOfSearch === "answer"
                ? item.question
                : item._id,
          }))
        );
      }
    } else {
      // else search in specified Model type
      //1. get the Model if the typeOfSearch is known
      const modelInfo = ModelAndTypes.find((item) => item.type === typeOfSearch);
      if (!modelInfo) throw new Error("Invalid Type of Search");
      //2. query that model with dynamic searchField
      const queryResults = await modelInfo.model
        .find({ [modelInfo.searchField]: regexQuery })
        .limit(5);

      results = queryResults.map((item) =>
        // returning a custom made dynamic object for different use-cases
        ({
          title:
            typeOfSearch === "answer" ? `Answers containing ${query}` : item[modelInfo.searchField],
          type: typeOfSearch,
          id:
            typeOfSearch === "user"
              ? item.clerkId
              : typeOfSearch === "answer"
              ? item.question
              : item._id,
        })
      );
    }
    return JSON.stringify(results);
  } catch (error) {
    if (error instanceof Error) throw new Error("Cannot do global search");
  }
}
