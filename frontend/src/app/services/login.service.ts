import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:3001'; // URL do seu backend

  constructor(private http: HttpClient) { }

  login(email: string, passwordInput: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email: email, senha: passwordInput }) 
      .pipe(
        tap(response => {

          localStorage.setItem('usuarioFord', JSON.stringify(response));
          console.log("Login bem-sucedido, usuário salvo:", response);
        }),
        catchError((error: HttpErrorResponse) => {
          console.error('Erro no login service:', error);
        
          return throwError(() => error); 
        })
      );
  }

  logout(): void {
    localStorage.removeItem('usuarioFord');

  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('usuarioFord');
  }

  getCurrentUser(): any | null {
    const user = localStorage.getItem('usuarioFord');
    return user ? JSON.parse(user) : null;
  }
}