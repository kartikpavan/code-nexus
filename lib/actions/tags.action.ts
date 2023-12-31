"use server";
import { ITag } from "./../../database/models/tag.model";
import { connectToDb } from "@/database";
import { GetAllTagsParams, GetQuestionsByTagIdParams } from "./shared.types";
import Tag from "@/database/models/tag.model";
import { FilterQuery } from "mongoose";
import Question from "@/database/models/question.model";
import User from "@/database/models/user.model";

//! Get all Tags
export async function getAllTags(params: GetAllTagsParams) {
  try {
    connectToDb();
    const { searchQuery, filter, page = 1, pageSize = 10 } = params;
    // Calculate the amount of posts to skip based on the pageNumber and pageSize
    const skip = pageSize * (page - 1);
    const query: FilterQuery<typeof Tag> = {};
    if (searchQuery) {
      [(query.$or = [{ name: { $regex: new RegExp(searchQuery, "i") } }])];
    }

    let sortOptions = {};
    switch (filter) {
      case "popular":
        sortOptions = { questions: -1 }; // most questions
        break;
      case "recent":
        sortOptions = { createdAt: -1 };
        break;
      case "name":
        sortOptions = { name: 1 }; // sort by alphabetical order
        break;
      case "old":
        sortOptions = { createdAt: 1 };
        break;
      default:
        break;
    }

    const tags = await Tag.find(query)
      .skip(skip)
      .limit(pageSize)
      .sort(sortOptions)
      .populate("questions");
    const totalTags = await Tag.countDocuments(query);
    const isNext = totalTags > skip + tags.length;
    return { tags, isNext };
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
  }
}

export async function getQuestionsByTagId(params: GetQuestionsByTagIdParams) {
  try {
    connectToDb();
    const { tagId, page = 1, pageSize = 10, searchQuery } = params;
    // Calculate the amount of posts to skip based on the page Number and page size
    const skip = pageSize * (page - 1);
    const tagFilter: FilterQuery<ITag> = { _id: tagId };
    const tag = await Tag.findOne(tagFilter).populate({
      path: "questions",
      model: Question,
      match: searchQuery ? { title: { $regex: searchQuery, $options: "i" } } : {},
      options: { sort: { createdAt: -1 }, skip: skip, limit: pageSize + 1 },
      populate: [
        { path: "tags", model: Tag, select: "_id name" },
        { path: "author", model: User, select: "_id name clerkId picture" },
      ],
    });
    const isNext = tag.questions.length > pageSize;
    if (!tag) throw new Error("Tag not Found");

    const questions = tag.questions;
    return { tagTitle: tag.name, questions, isNext };
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
  }
}

export async function getPopularTags() {
  try {
    connectToDb();
    const popularTags = await Tag.aggregate([
      { $project: { name: 1, numberOfQuestions: { $size: "$questions" } } },
      { $sort: { numberOfQuestions: -1 } },
      { $limit: 5 },
    ]);
    return popularTags;
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
  }
}
