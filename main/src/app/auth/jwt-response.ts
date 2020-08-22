export class JwtResponse {
  jwttoken: string;
  accountName: string;
  authorities: Authority[];
  userId: number;
}

export interface Authority {
  authority: string;
}
