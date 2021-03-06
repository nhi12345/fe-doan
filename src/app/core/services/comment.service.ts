import { Comment } from './../../shared/models/comment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AlertService } from './alert.service';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class CommentService {

  private commentUrl = environment.apiUrl + "/comments"

  httpOptions = {
    headers: new HttpHeaders({
      'Context-Type': 'application/json',
      'Authorization': 'Bearer '
    })
  };

  constructor(
    private http: HttpClient,
    private alertService: AlertService
  ) {
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.alertService.error(`${operation} failed: ${error.alertService}`);
      return of(result as T);
    }
  }

  getComment(id:number):Observable<Comment>{
    return this.http.get<Comment>(this.commentUrl).pipe(
      catchError(this.handleError<Comment>('getComment'))
    )
  }

  getCommentByTask(id:number):Observable<Comment[]>{
    const url=`${this.commentUrl}/task/${id}`;
    return this.http.get<Comment[]>(url,this.httpOptions).pipe(
      catchError(this.handleError<Comment[]>('getCommnetBytask'))
    )
  }

  addCommnet(id:number,content:string):Observable<Comment>{
    const url=`${this.commentUrl}/task/${id}`;
    return this.http.post<Comment>(url,{content}).pipe(
      catchError(this.handleError<Comment>('addComment'))
    )
  }

  updateComment(id:number,content:string):Observable<Comment>{
    const url=`${this.commentUrl}/edit/${id}`;
    return this.http.put<Comment>(url,{content}).pipe(
      catchError(this.handleError<Comment>('editComment'))
    )
  }

  deleteComment(id:number):Observable<Comment[]>{
    const url=`${this.commentUrl}/${id}`;
    return this.http.delete<Comment[]>(url,this.httpOptions).pipe(
      catchError(this.handleError<Comment[]>('deleteComment'))
    )
  }
}