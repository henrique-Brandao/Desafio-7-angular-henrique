import { Component, inject } from '@angular/core';
import { MenuComponent } from "../../components/menu/menu.component";
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MenuComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  router = inject(Router);

  goToDashboard() {
    this.router.navigate(["/dashboard"]);
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate([""]);
  }
}