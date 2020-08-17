
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private readonly API_URL = "http://localhost:8080/api/v1/user"
  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.API_URL}/${id}`);
  }

  createUser(user: Object): Observable<Object> {
    return this.http.post(`${this.API_URL}`, user);
  }

  updateUser(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.API_URL}/${id}`, value);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`, { responseType: 'text' });
  }

  getAllUser(): Observable<any> {
    return this.http.get(`${this.API_URL}`);
  }
}
