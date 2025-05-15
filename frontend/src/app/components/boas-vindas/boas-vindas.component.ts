import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-boas-vindas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './boas-vindas.component.html',
  styleUrls: ['./boas-vindas.component.css']
})
export class BoasVindasComponent implements OnInit {
  userName: string = 'Usuário';
  welcomeMessage: string = '';
  
  ngOnInit() {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        this.userName = user.nome || 'Usuário';
      } catch (e) {
        console.error('Erro ao obter dados do usuário', e);
      }
    }
    
    const hour = new Date().getHours();
    if (hour < 12) {
      this.welcomeMessage = 'Tenha um excelente dia!';
    } else if (hour < 18) {
      this.welcomeMessage = 'Tenha uma excelente tarde!';
    } else {
      this.welcomeMessage = 'Tenha uma excelente noite!';
    }
  }
}