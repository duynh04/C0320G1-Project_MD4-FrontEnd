export class AuthLoginInfo {
  accountName: string;
  accountPassword: string;

  constructor(accountName: string, accountPassword: string) {
    this.accountName = accountName;
    this.accountPassword = accountPassword;
  }
}
