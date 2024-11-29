// API Requires:
// @IsString()
// @IsStrongPassword({
//   minLength: 8,
//   minLowercase: 1,
//   minUppercase: 1,
//   minNumbers: 1,
//   minSymbols: 1,
// })
// readonly newPassword: string;

import i18n from '@/plugins/i18n';
import { TranslateResult } from 'vue-i18n';

export function validatePassword(
  password: string,
): boolean | TranslateResult {
  if (password.length < 8) {
    return i18n.global.t('Password must be at least 8 characters');
  }

  if (!/[a-z]/.test(password)) {
    return i18n.global.t(
      'Password must have at least one lowercase letter',
    );
  }

  if (!/[A-Z]/.test(password)) {
    return i18n.global.t(
      'Password must have at least one uppercase letter',
    );
  }

  if (!/\d/.test(password)) {
    return i18n.global.t('Password must have at least one number');
  }

  return true;
}

export function validateEmail(email: string): boolean {
  return /.+@.+\..+/.test(email);
}
