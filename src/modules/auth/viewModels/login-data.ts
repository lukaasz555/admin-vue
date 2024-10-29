export class LoginData {
  isValid = false;
  email = '';
  password = '';

  rules = {
    email: [
      (v: string) => !!v || 'E-mail is required',
      (v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    password: [
      (v: string) => !!v || 'Password is required',
      (v: string) =>
        v.length >= 8 || 'Password must be at least 8 characters',
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
