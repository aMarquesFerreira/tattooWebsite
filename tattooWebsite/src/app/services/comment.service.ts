import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = 'http://localhost:8080/api/comments'; // URL correta do seu servidor backend
  private acceptedCommentsUrl = 'http://localhost:8080/api/accepted-comments'; // URL para os comentários aceitos

  constructor(private http: HttpClient) {}

  submitComment(comment: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, comment);
  }

  getAcceptedComments(): Observable<any[]> {
    return this.http.get<any[]>(this.acceptedCommentsUrl);
  }
}
