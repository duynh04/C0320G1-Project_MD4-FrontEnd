import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommentLevel2 } from "../models/comment-level2";

@Injectable({
  providedIn: 'root'
})
export class CommentLevel2Service {

  private API = 'http://localhost:8080/api/v1/comment-level2';

  constructor(
    private httpClient: HttpClient
  ) { }

  getAllCommentLevel2(): Observable<any> {
    return this.httpClient.get(this.API);
  }

  addNewCommentLevel2(commentLevel2): Observable<any> {
    return this.httpClient.post(this.API, commentLevel2);
  }

  getCommentLevel2ById(commentLevel2Id: number): Observable<any> {
    return this.httpClient.get(this.API + '/' + commentLevel2Id);
  }

  getCommentLevel2ByCommentLevel1Id(commentLevel1Id: number): Observable<CommentLevel2> {
    return this.httpClient.get<CommentLevel2>(this.API + '/comment-level1/' + commentLevel1Id);
  }

  deleteCommentLevel2ById(commentLevel2Id: number): Observable<any> {
    return this.httpClient.delete(this.API + '/' + commentLevel2Id);
  }
}
