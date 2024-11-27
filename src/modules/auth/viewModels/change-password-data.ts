import i18n from '@/plugins/i18n';

export class ChangePasswordData {
  email = '';
  newPassword = '';
  confirmPassword = '';
  isValid = false;

  rules = {
    email: [
      (v: string) => !!v || i18n.global.t('Required field'),
      (v: string) =>
        /.+@.+\..+/.test(v) || i18n.global.t('Invalid e-mail'),
    ],
    newPassword: [
      (v: string) => !!v || i18n.global.t('Required field'),
      (v: string) =>
        v.length >= 8 ||
        i18n.global.t('Password must be at least 8 characters'),
    ],
    confirmPassword: [
      (v: string) => !!v || i18n.global.t('Required field'),
      (v: string) =>
        v === this.newPassword ||
        i18n.global.t('Passwords do not match'),
    ],
  };

  validate(): void {
    this.isValid =
      this.rules.email.every((rule) => rule(this.email) === true) &&
      this.rules.newPassword.every(
        (rule) => rule(this.newPassword) === true,
      ) &&
      this.newPassword === this.confirmPassword;
  }
}
