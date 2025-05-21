import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators'; 
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs'; 

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {
  router = inject(Router);
  currentRoute: string = '';
  userName: string = 'Usuário';

  private destroy$ = new Subject<void>();

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      takeUntil(this.destroy$)
    ).subscribe((event: any) => {
      this.currentRoute = event.url;
    });

    this.currentRoute = this.router.url;
    this.loadUserName();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadUserName(): void {
    const storedUserString = localStorage.getItem('usuarioFord');
    if (storedUserString) {
      try {
        const user = JSON.parse(storedUserString);
        this.userName = user.nome || 'Usuário';
      } catch (e) {
        console.error('Erro ao obter dados do usuário do localStorage:', e);
        this.userName = 'Usuário';
      }
    } else {
      this.userName = 'Usuário';
    }
  }

  navigate(route: string) {
    this.router.navigate([route]);
    if (window.innerWidth < 992) {
      const offcanvasElement = document.getElementById('sidebarMenu');
      if (offcanvasElement) {
        const bootstrapOffcanvas = (window as any).bootstrap?.Offcanvas?.getInstance(offcanvasElement);
        if (bootstrapOffcanvas) {
          bootstrapOffcanvas.hide();
        } else {
          const closeButton = offcanvasElement.querySelector('.btn-close');
          if (closeButton) {
            (closeButton as HTMLElement).click();
          }
        }
      }
    }
  }

  goToDashboard() {
    this.navigate('/dashboard');
  }

  logout() {
    localStorage.removeItem('usuarioFord');
    this.userName = 'Usuário';
    this.router.navigate(['']);
  }
}
