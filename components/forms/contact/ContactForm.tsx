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
import { contactSchema } from "@/lib/validators/contact.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";

const ContactForm = () => {
  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {},
  });
  return (
    <Form {...form}>
      <form className="flex flex-col gap-2 p-4">
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
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input autoFocus placeholder="Your email..." {...field} />
                </FormControl>
                <FormDescription className="text-xs"></FormDescription>
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <textarea
                  autoFocus
                  placeholder="Your message..."
                  {...field}
                  className="input"
                />
              </FormControl>
              <FormDescription className="text-xs"></FormDescription>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default ContactForm;
