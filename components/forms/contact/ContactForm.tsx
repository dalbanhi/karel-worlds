"use client";
import React from "react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
  FormControl,
} from "@/components/ui/form";

import { Textarea } from "@/components/ui/textarea";
import { contactSchema } from "@/lib/validators/contact.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ContactForm = () => {
  const onSubmit = (data: z.infer<typeof contactSchema>) => {
    console.log(data);
  };

  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2 p-4"
      >
        <div className="flex gap-2 w-full justify-center">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input autoFocus placeholder="Your name..." {...field} />
                </FormControl>
                <FormDescription className="text-xs"></FormDescription>
                <FormMessage>{form.formState.errors.name?.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input autoFocus placeholder="Your email..." {...field} />
                </FormControl>
                <FormDescription className="text-xs"></FormDescription>
                <FormMessage>
                  {form.formState.errors.email?.message}
                </FormMessage>
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <FormControl>
                <Input
                  autoFocus
                  placeholder="What are you reaching out about?"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-xs"></FormDescription>
              <FormMessage>
                {form.formState.errors.subject?.message}
              </FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  className="w-full"
                  //   maxLength={150}
                  placeholder="What can we help you with today?"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-xs"></FormDescription>
              <FormMessage>
                {form.formState.errors.message?.message}
              </FormMessage>
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default ContactForm;
