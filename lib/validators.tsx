import * as z from "zod";

export const AskQuestionSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title should be atleast 3 character long" })
    .max(130, { message: "Title should be atmost 130 character long" }),
  explanation: z.string().min(20),
  tags: z
    .array(z.string().min(2).max(15))
    .min(1, { message: "Atleast 1 tag must be added" })
    .max(3, { message: "Maximum 3 Tags Allowed" }),
});

export const AnswerSchema = z.object({
  answer: z.string().min(20),
});

export const EditProfileSchema = z.object({
  name: z.string().min(3).max(50),
  username: z.string().min(3).max(50),
  portfolio: z.string().url(),
  location: z.string().min(5).max(150),
  bio: z.string().min(5).max(150),
});
