import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from 'express';
import { inject } from '@angular/core';

@Component({
  selector: 'app-login',
  imports: [RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  correo: string = '';
  clave: string = '';
  resultado: string = '';
  colorResultado: string = '#008000';

  private http = inject(HttpClient);
  private router = inject(Router); 

  async onSubmit(event: Event): Promise<void> {
    event.preventDefault();

    const credenciales = {
      correo: this.correo,
      password: this.clave,
    };

    try {
      const response = await this.http
        .post('http://localhost:8090/peloteros/usuarios/login', credenciales, {
          headers: { 'Content-Type': 'application/json' },
        })
        .toPromise();

      if (response) {
        const resultado: any = response;
        this.resultado = 'Login exitoso!';
        this.guardarToken(resultado.token);
        this.guardarDatos('correo', this.correo);
        await this.saveData(this.correo, resultado.token);
        setTimeout(() => {
          this.router.navigate(['/index']); // ✅ Usa navigate sin error
        }, 2000);
      }
    } catch (error) {
      this.resultado = 'Error en las credenciales.';
      console.error(error);
    }
  }

  guardarToken(token: string): void {
    localStorage.setItem('token', token);
  }

  guardarDatos(nombre: string, valor: string): void {
    localStorage.setItem(nombre, valor);
  }

  async saveData(correo: string, token: string): Promise<void> {
    try {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      });

      const userData = await this.http
        .get(`http://localhost:8090/peloteros/usuarios/buscarxcorreo/${correo}`, { headers })
        .toPromise();

      localStorage.setItem('userData', JSON.stringify(userData));
    } catch (error) {
      console.error('Error al obtener los datos de la API:', error);
    }
  }
}
