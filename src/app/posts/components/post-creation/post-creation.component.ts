import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post-creation',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './post-creation.component.html',
  styleUrl: './post-creation.component.css'
})
export class PostCreationComponent implements OnInit{

  postForm!: FormGroup;

  selectedFile!: File;

  postCreated = false;

  imagePreview: string | ArrayBuffer | null = null;

  constructor(private formBuilder: FormBuilder, private router: Router, private postService: PostService) { }

  ngOnInit(): void {
    this.postForm = this.formBuilder.group({
      Title: ['', [Validators.required, Validators.minLength(5)]],
      Image: [null, [Validators.required]]
    });
  }

  onImagePicked(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.selectedFile = file;
      
      // Crear preview de la imagen
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);

      // Actualizar el control del formulario
      this.postForm.patchValue({
        Image: file
      });
      this.postForm.get('Image')?.updateValueAndValidity();
    }
  }

  fileValidator(control: AbstractControl): ValidationErrors | null {
    const file = control.value;
    if (file) {
      const maxSize = 5 * 1024 * 1024;
      const allowedTypes = ['image/jpeg', 'image/png'];
      if (!allowedTypes.includes(file.type)) {
        return { invalidFormat: true };
      }
      if (file.size > maxSize) {
        return { maxSizeExceeded: true };
      }
      return null;
    }
    return { required: true };
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.postForm.setValue({ Title: this.postForm.get('Title')?.value, Image: this.selectedFile });
    }
  }

  onSubmit() : void{

      const formData = new FormData();
      formData.append('Title', this.postForm.get('Title')?.value);
      formData.append('Image', this.selectedFile);
      this.postService.createPost(formData).subscribe({
        next: () => {
          this.postCreated = true;
          setTimeout(() => this.router.navigate(['/posts']), 3000);
        },
        error: (err) => {
          console.error('Error al crear el post:', err);
        }
      });
    
  
  }

  get title() {
    return this.postForm.get('Title');
  }

  goToHome() {
    this.router.navigate(['/home']);
  }
  goToPosts() {
    this.router.navigate(['/posts']);
  }


}
