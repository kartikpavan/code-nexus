"use server";

import { connectToDb } from "@/database";
import { GetAllTagsParams } from "./shared.types";
import Tag from "@/database/models/tag.model";

//! Get all Tags
export async function getAllTags(params: GetAllTagsParams) {
  try {
    connectToDb();
    const tags = await Tag.find({});
    return { tags };
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
  }
}
