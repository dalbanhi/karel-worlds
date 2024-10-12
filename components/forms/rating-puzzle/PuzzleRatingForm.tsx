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

import { Checkbox } from "@/components/ui/checkbox";

import React from "react";
import { Form } from "@/components/ui/form";
import { puzzleRatingSchema } from "@/lib/validators/puzzleRating.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import StarRatingInteractive from "./StarRatingInteractive";
import { ratePuzzle } from "@/lib/actions/puzzles";
import { useRouter } from "next/navigation";

interface PuzzleRatingFormProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  puzzleId: string | undefined;
  currentUserID: string | undefined;
}

const PuzzleRatingForm: React.FC<PuzzleRatingFormProps> = ({
  open,
  setOpen,
  puzzleId,
  currentUserID,
}) => {
  const router = useRouter();
  const onSubmit = async (data: z.infer<typeof puzzleRatingSchema>) => {
    console.log(data);
    await ratePuzzle(data);
    setOpen(false);
    router.push(`/my-stuff/?view=solved-puzzles`);
  };

  const form = useForm<z.infer<typeof puzzleRatingSchema>>({
    resolver: zodResolver(puzzleRatingSchema),
    defaultValues: {
      liked: false,
      rating: -1,
      difficulty: -1,
      puzzleId: puzzleId,
      userId: currentUserID,
    },
  });
  if (!puzzleId) return null;
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
              <span className="flex flex-col w-full justify-center items-start gap-2">
                <FormField
                  control={form.control}
                  name="rating"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rating</FormLabel>
                      <FormControl>
                        <StarRatingInteractive
                          value={field.value}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                          type="rating"
                        />
                      </FormControl>
                      <FormDescription className="text-xs"></FormDescription>
                      <FormMessage>
                        {form.formState.errors.rating?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="difficulty"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Difficulty</FormLabel>
                      <FormControl>
                        <StarRatingInteractive
                          value={field.value}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                          type="difficulty"
                        />
                      </FormControl>
                      <FormDescription className="text-xs"></FormDescription>
                      <FormMessage>
                        {form.formState.errors.difficulty?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />
              </span>
              <FormField
                control={form.control}
                name="liked"
                render={({ field }) => (
                  <FormItem className="flex items-start flex-col">
                    <span className="flex items-center gap-1">
                      {" "}
                      <FormLabel>Did you like the puzzle?</FormLabel>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </span>

                    <FormDescription className="text-xs">
                      {!field.value
                        ? "Check the box to like the puzzle."
                        : "Uncheck the box to not like the puzzle. "}
                    </FormDescription>
                    <FormMessage>
                      {form.formState.errors.liked?.message}
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
