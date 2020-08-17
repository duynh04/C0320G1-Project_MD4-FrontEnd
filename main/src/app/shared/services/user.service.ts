import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8080/api/v1/users';

  constructor(private http: HttpClient) {
  }

  // tslint:disable-next-line:ban-types
  createAccount(account: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, account);
  }
}
