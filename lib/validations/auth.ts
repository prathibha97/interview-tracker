// lib/validations/auth.ts

import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email({
    message: 'Valid email is required',
  }),
  password: z.string().min(1, {
    message: 'Password is required',
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  name: z.string().min(1, {
    message: 'Name is required',
  }),
  email: z.string().email({
    message: 'Valid email is required',
  }),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters',
  }),
});
