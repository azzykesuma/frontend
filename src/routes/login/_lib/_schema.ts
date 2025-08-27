import { z } from 'zod'

export const loginSchema = z.object({
  username: z.string().min(1, { message: 'Username is required' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' }),
})

export type LoginSchema = z.infer<typeof loginSchema>
