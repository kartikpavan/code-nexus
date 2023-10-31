"use client";
import { AskQuestionSchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { Editor } from "@tinymce/tinymce-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
import { createQuestion } from "@/lib/actions/question.action";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { Badge } from "../ui/badge";

const btnType: string = "create";

const QuestionForm = ({ currentUserID }: { currentUserID: string }) => {
  const router = useRouter();
  const currentPath = usePathname();

  const form = useForm<z.infer<typeof AskQuestionSchema>>({
    resolver: zodResolver(AskQuestionSchema),
    defaultValues: {
      title: "",
      explanation: "",
      tags: [],
    },
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const editorRef = useRef(null);

  // Add Tag
  const handleInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: any
  ) => {
    if (e.key === "Enter" && field.name === "tags") {
      e.preventDefault();
      const inputTag = e.target as HTMLInputElement;
      const tagValue = inputTag.value; // get the tag name

      // check if tag field is not empty
      if (tagValue !== "") {
        // if tag is more than 15 chars throw err
        if (tagValue.length > 15) {
          return form.setError("tags", {
            type: "required",
            message: "Tag must be less than 15 characters",
          });
        }
        if (tagValue.length < 3) {
          return form.setError("tags", {
            type: "required",
            message: "Tag must be more than 2 characters",
          });
        }
        // if tag is not repeated / included in tags[] || checking for duplicacy
        if (!field.value.includes(tagValue as never)) {
          // setting value
          form.setValue("tags", [...field.value, tagValue]);
          inputTag.value = "";
          form.clearErrors("tags");
        } else {
          form.trigger();
        }
      }
    }
  };

  // Remove Tag
  const handleTagRemove = (currentTag: string, field: any) => {
    const newTagList = field.value.filter((tag: string) => tag !== currentTag);

    form.setValue("tags", newTagList);
  };

  const submitHandler = async (values: z.infer<typeof AskQuestionSchema>) => {
    try {
      setIsSubmitting(true);
      // Api call to backend
      await createQuestion({
        title: values.title,
        content: values.explanation,
        tags: values.tags,
        author: JSON.parse(currentUserID),
        path: currentPath,
      });
      router.push("/");
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        setIsSubmitting(false);
      }
    } finally {
      setIsSubmitting(false);
    }

    console.log(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submitHandler)}
        className="flex flex-col w-full space-y-6"
      >
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
                Be specific and imagine you are asking a question to another
                person
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Explaination */}
        <FormField
          control={form.control}
          name="explanation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Detailed explaination of your problem{" "}
                <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Editor
                  apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                  onInit={(evt, editor) => {
                    // @ts-ignore
                    editorRef.current = editor;
                  }}
                  onBlur={field.onBlur}
                  onEditorChange={(content) => field.onChange(content)}
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
                      "undo redo" +
                      "codesample bold italic forecolor | alignleft aligncenter " +
                      "alignright alignjustify | bullist numlist ",
                    content_style:
                      "body { font-family:Inter,Arial,sans-serif; font-size:16px }",
                  }}
                />
              </FormControl>
              <FormDescription className="text-light italic text-primary/70 text-xs">
                Introduce your problem and expand on what you put in the title.
                Minimum 20 characters.
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
                <>
                  <Input
                    placeholder="Add Tags.."
                    onKeyDown={(e) => handleInputKeyDown(e, field)}
                  />
                  {field.value.length > 0 ? (
                    <div className="flex flex-start gap-3 pt-2 flex-wrap w-full">
                      {field.value.map((tag: any) => {
                        return (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="cursor-pointer"
                          >
                            {tag}
                            <Image
                              src="/icons/close.svg"
                              alt="removetag"
                              height={13}
                              width={13}
                              onClick={() => handleTagRemove(tag, field)}
                            />
                          </Badge>
                        );
                      })}
                    </div>
                  ) : null}
                </>
              </FormControl>
              <FormDescription className="text-light italic text-primary/70 text-xs">
                Add upto 3 tags to describe what your question is about. Press
                enter to add a tag.{" "}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Making the btn dynamic for editing and posting new Question */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="max-w-[150px] w-full"
        >
          {isSubmitting ? (
            <>{btnType === "edit" ? "Editing..." : "Posting..."}</>
          ) : (
            <>{btnType === "edit" ? "Edit Post" : "Submit Question"}</>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default QuestionForm;
