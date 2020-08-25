export class AuthLoginInfo {
    email: string;
    password: string;

    constructor(accountName: string, accountPassword: string) {
        this.email = accountName;
        this.password = accountPassword;
    }
}
