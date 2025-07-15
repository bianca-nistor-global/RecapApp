import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, concatMap, from, Observable, of, toArray } from 'rxjs';
import { PostsModel } from '../interface/profile.model';

@Injectable({
  providedIn: 'root',
})
export class ApiLoader {
  private baseUrl = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) {}
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
  getPosts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/posts`);
  }

  getPostsById(postId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/posts/${postId}`);
  }

  addPost(post: PostsModel): Observable<PostsModel> {
    return this.http.post<PostsModel>(`${this.baseUrl}/posts`, post)
  }
  editPost(id:number,updatedPost: Partial<PostsModel>): Observable<PostsModel>{
    return this.http.put<PostsModel>(`${this.baseUrl}/posts/${id}`,updatedPost)
    .pipe(catchError(this.handleError<PostsModel>('editPost')))
  }
  deletePost(id: number): Observable<void>{
    return this.http.delete<void>(`${this.baseUrl}/posts/${id}`).pipe(
      catchError(this.handleError<void>('deletePost'))
    )
  }

  loadFromUrl(urls: string[]): Observable<any[]> {
    return from(urls).pipe(
      concatMap((url: string) => this.http.get<any>(url)),
      toArray()
    );
  }
}
