import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApprovementStatus} from '../models/Approvement-status';

@Injectable({
  providedIn: 'root'
})
export class ApprovementStatusService {
  private readonly API_URL = 'http://localhost:8080/approvementStatus';
  constructor(private http: HttpClient) { }

  httpOption = {
    headers: new HttpHeaders({
      'content-Type' : 'application/json'
    })
  };
  getApprovementStatusList(): Observable<ApprovementStatus[]> {
    return this.http.get<ApprovementStatus[]>(this.API_URL);
  }
}
