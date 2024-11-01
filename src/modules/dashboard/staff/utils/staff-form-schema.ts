import { z } from 'zod';
import i18n from '@/plugins/i18n';

export const staffSchema = z.object({
  name: z.string().min(1, i18n.global.t('Required field')),
  lastname: z.string().min(1, i18n.global.t('Required field')),
  email: z.string().email(i18n.global.t('Invalid email address')),
  phoneNumber: z
    .string()
    .length(9, i18n.global.t('Phone number must have 9 digits')),
  role: z.string().min(1, i18n.global.t('Required field')),
});
