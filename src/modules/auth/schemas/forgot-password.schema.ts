import i18n from '@/plugins/i18n';
import { z } from 'zod';

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .max(64)
    .email(i18n.global.t('Invalid email address')),
});
