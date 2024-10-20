import { z } from 'zod';

export const forgotPasswordSchema = z.object({
  email: z.string().max(64).email('Invalid email'),
});
