import { Component, inject, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {
  router = inject(Router);
  currentRoute: string = '';
  userName: string = 'Usuário';
  
  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.currentRoute = event.url;
    });
    
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        this.userName = user.nome || 'Usuário';
      } catch (e) {
        console.error('Erro ao obter dados do usuário', e);
      }
    }
    
    this.currentRoute = this.router.url;
  }

  navigate(route: string) {
    this.router.navigate([route]);
    if (window.innerWidth < 992) {
      const offcanvasElement = document.getElementById('sidebarMenu');
      if (offcanvasElement) {
        const closeButton = offcanvasElement.querySelector('.btn-close');
        if (closeButton) {
          (closeButton as HTMLElement).click();
        }
      }
    }
  }
  
  goToDashboard() {
    this.navigate('/dashboard');
  }
  
  logout() {
    sessionStorage.clear();
    this.router.navigate(['']);
  }
}