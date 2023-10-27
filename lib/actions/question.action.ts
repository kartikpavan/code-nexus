"use server";

import { connectToDb } from "@/database";

export async function createQuestion(params: any) {
  try {
    connectToDb();
  } catch (error) {}
}
