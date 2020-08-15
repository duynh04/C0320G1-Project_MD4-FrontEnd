import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API = 'http://localhost:8080/api/v1/user';

  constructor(
    private httpClient: HttpClient
  ) { }

  getUserById(userId: number): Observable<any> {
    return this.httpClient.get(this.API + '/' + userId);
  }
}
