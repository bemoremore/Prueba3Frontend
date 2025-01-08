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
  errorMessage: string | null = null;
  loginSuccess = false;
  

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService, private jwtService: JwtService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  

  onSubmit() {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Por favor, llena todos los campos.';
      return
    }

    const loginUser: User = {
      mail: this.loginForm.value.email,
      password: this.loginForm.value.password
    };

    this.userService.login(loginUser).subscribe({
      next: (response) => {
        this.loginSuccess = true;
        this.errorMessage = null;
        this.jwtService.setToken(response.token);
        console.log('Login exitoso, token guardado');

        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 2000); // Retraso de 2 segundos para mostrar el mensaje
      },
      error: (error) => {
        this.loginSuccess = false;
        //Se limpia el formulario pero solo la contraseña
        this.loginForm.get('password')?.reset();
        if (error.status === 401) {
          this.errorMessage = 'Credenciales inválidas. Intenta nuevamente.';
        } else if (error.status === 0) {
          this.errorMessage = 'No se pudo conectar con el servidor. Intenta nuevamente.';
        } else if (error.status === 400) {
          this.errorMessage = 'Error al validar los datos. Intenta nuevamente.';
        } else {
          this.errorMessage = 'Hubo un error en el servidor. Intenta nuevamente.';
        }
        console.error('Error en el login:', error);
      },
    });

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
