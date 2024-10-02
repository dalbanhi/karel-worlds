import { z } from "zod";

const tagSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(50),
});

export const puzzleSchema = z.object({
  //   id: z.string().uuid(), // UUID validation for the 'id' field
  name: z
    .string()
    .min(1, { message: "Name must be at least 1 character long" })
    .max(50, { message: "Name must be at most 50 characters long" })
    .or(z.literal("")), // Allow empty string
  description: z
    .string()
    .max(150, { message: "Description must be at most 150 characters long" })
    .or(z.literal("")), // Allow empty string
  tags: z.array(z.string()), // Array of strings for the 'tags' field
  worldWidth: z.number().int().min(1), // Positive integer for 'worldWidth'
  worldHeight: z.number().int().min(1), // Positive integer for 'worldHeight'
  hints: z.array(z.string()), // Array of strings for the 'hints' field
  difficulty: z.number().int().min(-1).max(5), // Integer between 1 and 5 for 'difficulty'
  rating: z.number().int().min(-1).max(5), // Integer between 1 and 5 for 'rating'
  karelImage: z
    .string()
    .refine((val) => val === "" || z.string().url().safeParse(val).success, {
      message: "Must be a valid URL or an empty string",
    }), // URL or empty string validation for 'karelImage'
  beepersImage: z
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
  creatorId: z.string().uuid({ message: "Invalid UUID for creatorId" }), // UUID for 'creatorId' and custom message when it's empty
  likedBy: z.array(z.string().uuid()).optional(), // Array of UUIDs for likedBy (if it's used in the request)
  collections: z.array(z.string().uuid()).optional(), // Array of UUIDs for collections (optional)
  createdAt: z.date().default(() => new Date()), // Automatically generated date for 'createdAt'
  updatedAt: z.date().optional(), // Automatically upd
});
