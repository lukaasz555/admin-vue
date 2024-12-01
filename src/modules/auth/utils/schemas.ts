import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';
import i18n from '@/plugins/i18n';

export const loginFormSchema = toTypedSchema(
  z.object({
    email: z
      .string()
      .min(1, i18n.global.t('Required field'))
      .email(i18n.global.t('Invalid email')),
    password: z
      .string()
      .min(
        8,
        i18n.global.t('Password must be at least 8 characters long'),
      )
      .max(
        60,
        i18n.global.t('Password must be at most 60 characters long'),
      )
      .refine((val) => /[a-z]/.test(val), {
        message: i18n.global.t(
          'Password must contain at least one lowercase letter',
        ),
      })
      .refine((val) => /[A-Z]/.test(val), {
        message: i18n.global.t(
          'Password must contain at least one uppercase letter',
        ),
      })
      .refine((val) => /\d/.test(val), {
        message: i18n.global.t(
          'Password must contain at least one digit',
        ),
      }),
  }),
);

export const changePasswordFormSchema = toTypedSchema(
  z
    .object({
      email: z
        .string()
        .min(1, i18n.global.t('Required field'))
        .email(i18n.global.t('Invalid email')),
      newPassword: z
        .string()
        .min(
          8,
          i18n.global.t(
            'Password must be at least 8 characters long',
          ),
        )
        .max(
          60,
          i18n.global.t(
            'Password must be at most 60 characters long',
          ),
        )
        .refine((val) => /[a-z]/.test(val), {
          message: i18n.global.t(
            'Password must contain at least one lowercase letter',
          ),
        })
        .refine((val) => /[A-Z]/.test(val), {
          message: i18n.global.t(
            'Password must contain at least one uppercase letter',
          ),
        })
        .refine((val) => /\d/.test(val), {
          message: i18n.global.t(
            'Password must contain at least one digit',
          ),
        }),
      confirmPassword: z.string(),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      path: ['confirmPassword'],
      message: i18n.global.t('Passwords do not match'),
    }),
);

export const forgotPasswordFormSchema = toTypedSchema(
  z.object({
    email: z
      .string()
      .min(1, i18n.global.t('Required field'))
      .email(i18n.global.t('Invalid email')),
  }),
);
