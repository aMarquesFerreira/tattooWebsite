import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = 'https://tattoobackend.onrender.com/api/comments';
  private acceptedCommentsUrl = 'https://tattoobackend.onrender.com/api/accepted-comments';

  constructor(private http: HttpClient) {}

  submitComment(comment: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, comment);
  }

  getAcceptedComments(): Observable<any[]> {
    return this.http.get<any[]>(this.acceptedCommentsUrl);
  }
}
