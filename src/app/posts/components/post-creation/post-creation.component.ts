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

  constructor(private formBuilder: FormBuilder, private router: Router, private postService: PostService) { }

  ngOnInit(): void {
    this.postForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      image: ['', [Validators.required, this.fileValidator.bind(this)]]
    });
  }

  fileValidator(control: AbstractControl): ValidationErrors | null {
    const file = control.value;
    if (file && file.size > 0) {
      return null;
    }
    return { required: true };
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit() : void{
    if (this.postForm.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('title', this.postForm.get('title')?.value);
      formData.append('image', this.selectedFile);

      this.postService.createPost(formData).subscribe({
        next: () => {
          alert('Post creado exitosamente');
          this.postCreated = true;
          this.router.navigate(['/posts/create']);
        },
        error: (err) => {
          console.error('Error al crear el post:', err);
        }
      });
    } else {
      alert('Por favor, completa el formulario y selecciona una imagen.');
    }
  
  }

  get title() {
    return this.postForm.get('title');
  }

  goToHome() {
    this.router.navigate(['/home']);
  }
  goToPosts() {
    this.router.navigate(['/posts']);
  }


}
