import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(8),
  password: z.string().min(8),
});
export const signUpSchema = z.object({
  userName: z.string().min(8),
  password: z.string().min(8),
  email: z.string().email(),
  firstName: z.string().min(1).max(25),
  lastName: z.string().min(1).max(25),
  bio: z.string().min(1),
});

export const profileTabValidatorSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  bio: z.string(),
  designation: z.string(),
  user_name: z.string(),
  email: z.string(),
});

export const aboutTabValidatorSchema = z.object({
  shortDescription: z.string(),
  description: z.string(),
  imageLink: z.string(),
  email: z.string(),
  phoneNumber: z.string(),
  location: z.string(),
});

export const contactTabValidatorSchema = z.object({
  contacts: z.array(
    z.object({
      id: z.number().optional(),
      link: z.string(),
      linkType: z
        .string()
        .transform(
          (val) => val as "GITHUB" | "YOUTUBE" | "X" | "MAIL" | "LINKEDLN"
        ),
    })
  ),
});
