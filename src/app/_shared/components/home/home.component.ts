import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { JwtService } from '../../services/jwt.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private jwtService: JwtService) { }

  logout(): void {
    this.jwtService.clearToken(); // Borra el token almacenado
    this.router.navigate(['/login']); // Redirige al usuario al login
  }

  ngOnInit() {
    console.log('Token en HomeComponent:', this.jwtService.getToken());
  }

  viewPosts() {
    this.router.navigate(['/posts']);
  }

  createPost() {
    this.router.navigate(['/posts/create']);
  }
  
}
