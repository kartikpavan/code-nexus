import * as z from "zod";

export const AskQuestionSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title should be atleast 3 character long" })
    .max(130, { message: "Title should be atmost 130 character long" }),
  explanation: z.string().min(20),
  tags: z.array(z.string().min(2).max(15)).min(1).max(3),
});

export const AnswerSchema = z.object({
  answer: z.string().min(20),
});
