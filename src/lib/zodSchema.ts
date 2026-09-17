import z from "zod";

export const loginSchema = z.object({
  email: z
    .email({ error: "Enter a valid email address" })
    .max(64, { error: "Email must be at most 64 characters" }),
  password: z
    .string()
    .min(8, { error: "Password must be at least 8 characters" })
    .max(128, { error: "Password must be at most 128 characters" }),
  rememberMe: z.boolean().optional(),
});

export type LoginType = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, { error: "Name must be at least 2 characters" })
      .max(32, { error: "Name must be at most 32 characters" }),
    email: z
      .email({ error: "Enter a valid email address" })
      .max(64, { error: "Email must be at most 64 characters" }),
    password: z
      .string()
      .min(8, { error: "Password must be at least 8 characters" })
      .max(128, { error: "Password must be at most 128 characters" }),
    confirmPassword: z
      .string()
      .min(8, { error: "Password must be at least 8 characters" })
      .max(128, { error: "Maximum 128 Characters" }),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterType = z.infer<typeof registerSchema>;
