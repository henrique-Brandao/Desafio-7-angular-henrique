import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {}

  canActivate(): boolean | UrlTree {
    // Verifica diretamente no localStorage (igual ao backend)
    const usuario = localStorage.getItem('usuarioFord');
    
    if (usuario) { // Se existir usuário salvo
      return true;
    } else {
      // Redireciona para o login com a URL de origem
      return this.router.createUrlTree(['/login']);
    }
  }
}