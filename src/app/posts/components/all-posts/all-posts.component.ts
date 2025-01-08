import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from '../../services/post.service';
import { Post } from '../../interfaces/post';
import { animate, style, transition, trigger } from '@angular/animations';


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
  currentSlide = 0;
  private autoSlideInterval: any;

  constructor(private formBuilder: FormBuilder, private router: Router, private postService: PostService) { }

  ngOnInit(): void {
    this.showPosts();
    this.startAutoSlide();
  }

  showPosts() {
    this.postService.getPosts().subscribe({
      next: (response: Post[]) => {
        this.posts = response;
        console.log("Posts obtenidos:", this.posts);
      },
      error: (error) => {
        console.error("Error al obtener los posts", error);
      }
    });
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.posts.length;
    this.resetAutoSlide();
  }

  prevSlide(): void {
    this.currentSlide = (this.currentSlide - 1 + this.posts.length) % this.posts.length;
    this.resetAutoSlide();
  }

  setSlide(index: number): void {
    this.currentSlide = index;
    this.resetAutoSlide();
  }

  private startAutoSlide(): void {
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide();
    }, 5000); // Cambia cada 5 segundos
  }

  private stopAutoSlide(): void {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }

  private resetAutoSlide(): void {
    this.stopAutoSlide();
    this.startAutoSlide();
  }


  goToCreatePost() {
    this.router.navigate(['/posts/create']);
  }

  goToHome() {
    this.router.navigate(['/home']);
  }

  

}
