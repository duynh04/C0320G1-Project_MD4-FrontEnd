import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductCommentDto } from "../models/dtos/product-comment-dto";

@Injectable({
  providedIn: 'root'
})
export class CommentLevel1Service {

  private API = 'http://localhost:8080/api/v1/comment-level1';

  constructor(
    private httpClient: HttpClient
  ) { }

  getAllCommentLevel1(): Observable<any> {
    return this.httpClient.get(this.API);
  }

  addNewCommentLevel1(commentLevel1): Observable<any> {
    return this.httpClient.post(this.API, commentLevel1);
  }

  getCommentLevel1ById(commentLevel1Id: number): Observable<any> {
    return this.httpClient.get(this.API + '/' + commentLevel1Id);
  }

  getCommentLevel1ByProductId(productId: number): Observable<ProductCommentDto[]> {
    return this.httpClient.get<ProductCommentDto[]>(this.API + '/product/' + productId);
  }

  deleteCommentLevel1ById(commentLevel1Id: number): Observable<any> {
    return this.httpClient.delete(this.API + '/' + commentLevel1Id);
  }
}
