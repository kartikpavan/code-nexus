"use client";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { EditProfileSchema } from "@/lib/validators";
import { usePathname, useRouter } from "next/navigation";
import { updateUser } from "@/lib/actions/user.action";

const ProfileForm = ({ clerkId, user }: { clerkId: string; user: string }) => {
  const router = useRouter();
  const pathName = usePathname();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const parsedUser = JSON.parse(user);

  const form = useForm<z.infer<typeof EditProfileSchema>>({
    resolver: zodResolver(EditProfileSchema),
    defaultValues: {
      name: parsedUser.name || "",
      username: parsedUser.username || "",
      portfolio: parsedUser.portfolioWebsite || "",
      location: parsedUser.location || "",
      bio: parsedUser.bio || "",
    },
  });

  async function onSubmit(values: z.infer<typeof EditProfileSchema>) {
    try {
      setIsSubmitting(true);
      //   update user Server action
      await updateUser({
        clerkId: clerkId,
        updateData: {
          name: values.name,
          username: values.username,
          bio: values.bio,
          location: values.location,
          portfolioWebsite: values.portfolio,
        },
        path: pathName,
      });
      router.back();
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
      setIsSubmitting(false);
    } finally {
      setIsSubmitting(false);
    }
    console.log(values);
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Name <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          {/* username */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Username <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Username" {...field} />
                </FormControl>
                <FormDescription>This is your public display name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Portfolio Link */}
          <FormField
            control={form.control}
            name="portfolio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Portfolio Link</FormLabel>
                <FormControl>
                  <Input placeholder="Your Portfolio URL" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          {/* Location */}
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="Where are you from ?" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Biography */}
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Bio <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Textarea placeholder="What's Special about you ?" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isSubmitting} type="submit">
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default ProfileForm;
