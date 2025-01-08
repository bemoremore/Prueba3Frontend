import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';
import { Console } from 'console';

@Component({
  selector: 'app-user-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.css'
})
export class UserRegisterComponent implements OnInit {

  registerForm!: FormGroup;
  userCreated = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), this.passwordValidator]],
    });
  }

  passwordValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.value;
    if (!/\d/.test(password)) {
       return { numberRequired: true };
    }
    return null;
 }
  

  onSubmit() {
    const newUser: User = {
      mail: this.registerForm.value.email,
      password: this.registerForm.value.password
    };
    console.log("Nuevo usuario", newUser);

    this.userService.createUser(newUser).subscribe({
      next: (response) => {
        console.log("Usuario creado", response);
        this.userCreated = true;
        setTimeout(() => this.router.navigate(['/login']), 3000);
      },
      error: (error) => {
        console.log("Error en el registro", error);
      }
    });

  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
