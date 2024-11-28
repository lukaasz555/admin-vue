import {
  validateEmail,
  validatePassword,
} from '@/global/helpers/validations';
import i18n from '@/plugins/i18n';

export class LoginData {
  isValid = false;
  email = '';
  password = '';

  rules = {
    email: [
      (v: string) => !!v || i18n.global.t('Required field'),
      (v: string) =>
        validateEmail(v) || i18n.global.t('Invalid email address'),
    ],
    password: [
      (v: string) => !!v || i18n.global.t('Required field'),
      (v: string) =>
        validatePassword(v) || i18n.global.t('Invalid value'),
    ],
  };

  validate(): void {
    this.isValid =
      this.rules.email.every((rule) => rule(this.email) === true) &&
      this.rules.password.every(
        (rule) => rule(this.password) === true,
      );
  }
}
