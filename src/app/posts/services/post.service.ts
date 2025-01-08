import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, map, Observable } from 'rxjs';
import { Post } from '../interfaces/post';
import { HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  private createHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    console.log("token", token);
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : '',
    });
  }

  getPosts(): Observable<Post[]> {
    const headers = this.createHeaders();
    return this.http.get<Post[]>('http://localhost:5137/api/Post', { headers })
      .pipe(map((posts: Post[]) => 
        posts.map((post) => ({
          ...post,
          publicationDate: new Date(post.publicationDate)
        }))
      ));
  }

  createPost(newPost: FormData): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: localStorage.getItem('authToken') 
        ? `Bearer ${localStorage.getItem('authToken')}` 
        : ''
    });
    return this.http.post('http://localhost:5137/api/Post', newPost, { headers })
      .pipe(
        catchError((error) => {
          console.log("Error en createPost", error);
          return EMPTY;
        })
      );
  }
}
