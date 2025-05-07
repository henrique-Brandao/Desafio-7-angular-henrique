// login.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:3001/login'; // Corrigido

  constructor(private http: HttpClient) {}

  login(nome: string, senha: string) {
    return this.http.post<{
      id: number;
      nome: string;
      email: string;
    }>(this.apiUrl, { nome, senha });
  }
}
