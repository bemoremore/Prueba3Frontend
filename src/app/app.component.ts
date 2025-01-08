import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { JwtService } from './_shared/services/jwt.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  template: '<router-outlet></router-outlet>',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Prueba3_FrontEnd';
  constructor(private jwtService: JwtService) {}

  ngOnInit() {
    // Asegurar que el servicio se inicialice al cargar la aplicación
    const token = this.jwtService.getToken();
    console.log('App initialized, auth state:', token ? 'authenticated' : 'not authenticated');
  }
}
