export class JwtResponse {
    [prop: string]: any;
    jwttoken: string;
    userId: number;
    accountName: string;
    authorities: Authority[];

}

export interface Authority {
    authority: String
}