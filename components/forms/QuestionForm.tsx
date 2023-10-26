"use client";
import { AskQuestionSchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Editor } from "@tinymce/tinymce-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRef } from "react";

const QuestionForm = () => {
  const form = useForm<z.infer<typeof AskQuestionSchema>>({
    resolver: zodResolver(AskQuestionSchema),
    defaultValues: {
      title: "",
      explaination: "",
      tags: [],
    },
  });

  const editorRef = useRef(null);

  const submitHandler = (values: z.infer<typeof AskQuestionSchema>) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitHandler)} className="flex flex-col w-full space-y-6">
        {/* Title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Question title <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription className="text-light italic text-primary/70 text-xs">
                Be specific and imagine you are asking a question to another person
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Explaination */}
        <FormField
          control={form.control}
          name="explaination"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Detailed explaination of your problem <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                {/* //TODO :Add TINY MCE EDITOR LATER */}
                <Editor
                  apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                  onInit={(evt, editor) => {
                    // @ts-ignore
                    editorRef.current = editor;
                  }}
                  initialValue="Write something here"
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
                  }}
                />
              </FormControl>
              <FormDescription className="text-light italic text-primary/70 text-xs">
                Introduce your problem and expand on what you put in the title. Minimum 20
                characters.{" "}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Tags */}
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Tags <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription className="text-light italic text-primary/70 text-xs">
                Add upto 3 tags to describe what your question is about. Press enter to add a tag.{" "}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default QuestionForm;
