import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApprovementStatus} from '../models/Approvement-status';

@Injectable({
  providedIn: 'root'
})
export class ApprovementStatusService {
  ApiApprovermentStatus = 'http://localhost:8081/api/v1/approvementStatus';
  constructor(private http: HttpClient) { }

  httpOption = {
    headers: new HttpHeaders({
      'content-Type' : 'application/json'
    })
  };
  getApprovementStatusList(): Observable<ApprovementStatus[]> {
    return this.http.get<ApprovementStatus[]>(this.ApiApprovermentStatus, this.httpOption);
  }
}