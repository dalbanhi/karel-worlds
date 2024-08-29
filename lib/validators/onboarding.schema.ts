import { Role } from "@prisma/client";
import { z } from "zod";

export const onboardingSchema = z.object({
  name: z.string().min(2).or(z.literal(null)),
  email: z.string().email(),
  imageUrl: z.string(),
  clerkUserId: z.string(),
  role: z.enum([Role.STUDENT, Role.TEACHER]),
});
