import { z } from "zod";

export const puzzleRatingSchema = z.object({
  //   id: z.string().uuid(), // UUID validation for the 'id' field
  puzzleId: z.string().uuid(),
  userId: z.string().uuid(),
  rating: z.number().int().min(0).max(5).or(z.literal(-1)),
  difficulty: z.number().int().min(0).max(5).or(z.literal(-1)),
  liked: z.boolean(),
});
