export class ChangePasswordData {
  email = '';
  newPassword = '';

  constructor(email: string, newPassword: string) {
    this.email = email;
    this.newPassword = newPassword;
  }
}
