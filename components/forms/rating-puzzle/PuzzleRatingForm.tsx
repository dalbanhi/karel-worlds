"use client";
import { Button } from "@/components/ui/button";
import {
  DialogHeader,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { User } from "@prisma/client";

import React from "react";
import { Form } from "@/components/ui/form";
import { contactSchema } from "@/lib/validators/contact.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface PuzzleRatingFormProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  puzzleId: string | undefined;
  currentUser: User | null;
}

const PuzzleRatingForm: React.FC<PuzzleRatingFormProps> = ({
  open,
  setOpen,
  puzzleId,
  currentUser,
}) => {
  if (!puzzleId) return null;
  const onSubmit = async (data: z.infer<typeof contactSchema>) => {
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
    <Dialog
      open={open}
      onOpenChange={() => {
        setOpen(!open);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rate this puzzle!</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-2 p-4"
            >
              <div className="flex w-full justify-center gap-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          autoFocus
                          placeholder="Your name..."
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="text-xs"></FormDescription>
                      <FormMessage>
                        {form.formState.errors.name?.message}
                      </FormMessage>
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
                        <Input
                          autoFocus
                          placeholder="Your email..."
                          {...field}
                        />
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
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default PuzzleRatingForm;
