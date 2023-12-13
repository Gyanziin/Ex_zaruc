import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Usuario } from '../interfaces/Usuario';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/usuarios';
  private isAuthenticatedValue = false; // Alteração aqui

  constructor(private http: HttpClient, private router: Router) {}

  getAll(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  login(username: string, password: string): Observable<any> {
    return this.getAll().pipe(
      map((usuarios: Usuario[]) => {
        const user = usuarios.find(
          (u: Usuario) => u.name === username && u.password === password
        );

        if (user) {
          // Lógica de login bem-sucedida
          this.isAuthenticatedValue = true; // Alteração aqui
          this.router.navigate(['/list-usuarios']);
          return { success: true, user };
        } else {
          return { success: false, message: 'Usuário ou senha inválidos' };
        }
      }),
      catchError(this.handleError)
    );
  }

  logout(): void {
    // Lógica de logout, se necessário
    this.isAuthenticatedValue = false; // Alteração aqui
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedValue; // Alteração aqui
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Erro na requisição:', error);
    return throwError('Erro ao processar a requisição. Por favor, tente novamente.');
  }
}
