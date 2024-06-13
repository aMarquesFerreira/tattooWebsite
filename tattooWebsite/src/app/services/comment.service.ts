import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = 'http://localhost:8080/api/comments'; // URL correta do seu servidor backend

  constructor(private http: HttpClient) {}

  submitComment(comment: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, comment);
  }
}
