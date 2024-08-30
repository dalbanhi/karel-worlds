"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { onboardingSchema } from "@/lib/validators/onboarding.schema";
import { createUser } from "@/lib/actions/users";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { z } from "zod";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
  FormControl,
} from "@/components/ui/form";

import {
  uniqueUsernameGenerator,
  Config,
  adjectives,
  nouns,
} from "unique-username-generator";

const config: Config = {
  dictionaries: [adjectives, nouns],
  style: "lowerCase",
  separator: "_",
  randomDigits: 3,
  length: 25,
};

interface OnboardingFormProps {
  baseUserInfo: {
    clerkUserId: string;
    name: string | null;
    imageUrl: string;
    email: string;
  };
}

const OnboardingForm: React.FC<OnboardingFormProps> = ({ baseUserInfo }) => {
  const router = useRouter();

  const onSubmit = async (data: z.infer<typeof onboardingSchema>) => {
    console.log("submitting", data);
    await createUser(data);
    router.push("/my-stuff");
  };

  const form = useForm<z.infer<typeof onboardingSchema>>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      role: undefined,
      name: baseUserInfo.name,
      email: baseUserInfo.email,
      imageUrl: baseUserInfo.imageUrl,
      clerkUserId: baseUserInfo.clerkUserId,
      username: "",
    },
  });

  useEffect(() => {
    const generatedUsername = uniqueUsernameGenerator(config);

    form.reset({
      ...form.getValues(),
      username: generatedUsername,
    });
  }, []);

  const handleRoleSubmit = (role: "TEACHER" | "STUDENT") => {
    form.setValue("role", role, { shouldValidate: true });
    form.handleSubmit(onSubmit)();
  };

  console.log(form.formState.errors);

  return (
    <Form {...form}>
      <form className="flex flex-col gap-2 p-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  autoFocus
                  placeholder="Choose a username..."
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-xs">
                This is your public display name. <br />
                Use the random one or choose your own. <br />
                Do <strong>not</strong> make it your email or make it identical
                to your actual name! 🙂
              </FormDescription>
              {form.formState.errors.username && (
                <FormMessage>{`Error: ${form.formState.errors.username.message}`}</FormMessage>
              )}
            </FormItem>
          )}
        />
        <FormItem>
          <FormLabel>Role</FormLabel>
          <div className="flex wrap gap-4">
            <Button
              className="size-36 flex flex-col text-primary"
              variant="outline"
              type="button"
              onClick={() => handleRoleSubmit("TEACHER")}
            >
              <Image
                className="fill-primary size-12"
                src="/images/teacher.svg"
                alt="teacher"
                width={48}
                height={48}
              />
              <span>Teacher</span>
            </Button>
            <Button
              className="size-36 flex flex-col text-primary"
              variant="outline"
              type="button"
              onClick={() => handleRoleSubmit("STUDENT")}
            >
              <Image
                className="fill-primary size-12"
                src="/images/student.svg"
                alt="student"
                width={48}
                height={48}
              />
              <span>Student</span>
            </Button>
          </div>
          <FormDescription className="text-xs">
            Choose the role that best describes you.
          </FormDescription>
        </FormItem>
      </form>
    </Form>
  );
};

export default OnboardingForm;
