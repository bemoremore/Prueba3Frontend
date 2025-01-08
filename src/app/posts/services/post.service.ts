import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, map, Observable } from 'rxjs';
import { Post } from '../interfaces/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>('http://localhost:5137/api/Post')
    .pipe(map((posts: Post[]) => 
      posts.map((post) => ({
        ...post,
        date: new Date(post.date)
      }))
    ));
  }

  createPost(newPost: FormData) {
    return this.http.post('http://localhost:5137/api/Post', newPost)
    .pipe(
      catchError((error) => {
        console.log("Error en createPost", error);
        return EMPTY;
      }
    )
  )};


}
