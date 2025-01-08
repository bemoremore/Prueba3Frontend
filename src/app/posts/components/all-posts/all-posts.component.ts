import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from '../../services/post.service';
import { Post } from '../../interfaces/post';

@Component({
  selector: 'app-all-posts',
  standalone: true,
  imports: [
    CommonModule,
      FormsModule,
      ReactiveFormsModule],
  templateUrl: './all-posts.component.html',
  styleUrl: './all-posts.component.css'
})
export class AllPostsComponent implements OnInit{

  postForm!: FormGroup;
  posts: Post[] = [];
  

  constructor(private formBuilder: FormBuilder, private router: Router, private postService: PostService) { }

  ngOnInit(): void {
    this.showPosts();
  }

  showPosts() {
    this.postService.getPosts().subscribe({
      next: (response) => {
        console.log("Posts", response);
      },
      error: (error) => {
        console.log("Error al obtener los posts", error);
      }
    });
  }

  goToCreatePost() {
    this.router.navigate(['/posts/create']);
  }

  goToHome() {
    this.router.navigate(['/home']);
  }

  

}
