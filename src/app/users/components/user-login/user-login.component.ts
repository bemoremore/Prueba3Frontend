import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { JwtService } from '../../../_shared/services/jwt.service';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent implements OnInit {

  loginForm!: FormGroup;
  error = false;
  loginSuccess = false;
  

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService, private jwtService: JwtService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  

  onSubmit() {
    const loginUser: User = {
      mail: this.loginForm.value.email,
      password: this.loginForm.value.password
    };

    this.userService.login(loginUser).subscribe(
      (response) => {
        this.loginSuccess = true;
        this.jwtService.setToken(response.token);
        this.router.navigate(['/home']);
      },
      (error) => {
        console.log("Error en el login", error);
        this.error = true;
      }
    );

  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
