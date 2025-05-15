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
    const usuario = localStorage.getItem('usuarioFord');
    
    if (usuario) {
      return true;
    } else {
      return this.router.createUrlTree(['/login']);
    }
  }
}