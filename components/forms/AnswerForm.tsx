"use client";
import React, { useRef, useState } from "react";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { useForm } from "react-hook-form";
import { AnswerSchema } from "@/lib/validators";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Editor } from "@tinymce/tinymce-react";
import { useTheme } from "next-themes";
import { Button } from "../ui/button";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { createAnswer } from "@/lib/actions/answer.action";

interface Props {
  questionId: string;
  authorId: string;
  question: string;
}

const AnswerForm = ({ authorId, questionId, question }: Props) => {
  const { theme } = useTheme();
  const currentPath = usePathname();
  const editorRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const form = useForm<z.infer<typeof AnswerSchema>>({
    resolver: zodResolver(AnswerSchema),
    defaultValues: {
      answer: "",
    },
  });

  const handleCreateAnswer = async (values: z.infer<typeof AnswerSchema>) => {
    try {
      setIsSubmitting(true);
      // submit answer
      await createAnswer({
        content: values.answer,
        author: JSON.parse(authorId),
        question: JSON.parse(questionId),
        path: currentPath,
      });
      // reset TinyMCE editor content
      form.reset();
      if (editorRef.current) {
        const editor = editorRef.current as any;
        editor.setContent("");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        setIsSubmitting(false);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="flex mt-3 gap-4 flex-col sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-sm font-semibold">
          Write your Answer here <span className="text-red-500">*</span>
        </h3>
        <Button variant="secondary" className="flex gap-3 text-primary" onClick={() => {}}>
          <Image src="/icons/magic.svg" alt="magic" width={20} height={20} />
          Generate an AI Answer
        </Button>
      </div>
      <Form {...form}>
        <form
          className="mt-3 flex w-full flex-col gap-10"
          onSubmit={form.handleSubmit(handleCreateAnswer)}
        >
          <FormField
            control={form.control}
            name="answer"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Editor
                    apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                    onInit={(evt, editor) => {
                      // @ts-ignore
                      editorRef.current = editor;
                    }}
                    onBlur={field.onBlur}
                    onEditorChange={(content) => field.onChange(content)}
                    init={{
                      height: 350,
                      menubar: false,
                      plugins: [
                        "advlist",
                        "autolink",
                        "lists",
                        "link",
                        "image",
                        "charmap",
                        "print",
                        "preview",
                        "anchor",
                        "searchreplace",
                        "visualblocks",
                        "codesample",
                        "fullscreen",
                        "insertdatetime",
                        "media",
                        "table",
                      ],
                      toolbar:
                        "undo redo | " +
                        "codesample bold italic forecolor | alignleft aligncenter " +
                        "alignright alignjustify | bullist numlist ",
                      content_style: "body { font-family:Inter,Arial,sans-serif; font-size:16px }",
                      skin: theme === "dark" ? "oxide-dark" : "oxide",
                      content_css: theme === "dark" ? "dark" : "light",
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button disabled={isSubmitting} type="submit">
              {isSubmitting ? "Posting" : "Submit"}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default AnswerForm;
