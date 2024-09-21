import { z } from "zod";

export const puzzleSchema = z.object({
  id: z.string().uuid(), // UUID validation for the 'id' field
  name: z.string().min(1), // Non-empty string for the 'name' field
  tags: z.array(z.string()), // Array of strings for the 'tags' field
  worldWidth: z.number().int().min(1), // Positive integer for 'worldWidth'
  worldHeight: z.number().int().min(1), // Positive integer for 'worldHeight'
  hints: z.array(z.string()), // Array of strings for the 'hints' field
  karelImage: z
    .string()
    .refine((val) => val === "" || z.string().url().safeParse(val).success, {
      message: "Must be a valid URL or an empty string",
    }), // URL or empty string validation for 'karelImage'
  beeperImage: z
    .string()
    .refine((val) => val === "" || z.string().url().safeParse(val).success, {
      message: "Must be a valid URL or an empty string",
    }), // URL or empty string validation for 'beeperImage'
  wallImage: z
    .string()
    .refine((val) => val === "" || z.string().url().safeParse(val).success, {
      message: "Must be a valid URL or an empty string",
    }), // URL or empty string validation for 'wallImage'
  backgroundImage: z
    .string()
    .refine((val) => val === "" || z.string().url().safeParse(val).success, {
      message: "Must be a valid URL or an empty string",
    }), // URL or empty string validation for 'backgroundImage'(nullable)
  startWorldInfo: z.any(), // Since startWorldInfo and goalWorldInfo are Json fields, using 'z.any()'
  goalWorldInfo: z.any(),
  creatorId: z.string().uuid(), // UUID for 'creatorId'
  likedBy: z.array(z.string().uuid()).optional(), // Array of UUIDs for likedBy (if it's used in the request)
  collections: z.array(z.string().uuid()).optional(), // Array of UUIDs for collections (optional)
  createdAt: z.date().default(() => new Date()), // Automatically generated date for 'createdAt'
  updatedAt: z.date().optional(), // Automatically upd
});
