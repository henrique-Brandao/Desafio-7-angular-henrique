import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router'; // Adicionado RouterModule
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule], // Adicionado RouterModule
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {
  username = '';
  password = '';
  confirmPassword = '';
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(private router: Router) {}

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      this.errorMessage = 'Por favor, preencha todos os campos obrigatórios.';
      this.successMessage = '';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'As senhas não coincidem.';
      this.successMessage = '';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    // Simulação de cadastro
    console.log('Tentativa de cadastro com:', { username: this.username, password: this.password });
    // Como não há backend para cadastro, vamos apenas simular sucesso e redirecionar para o login.
    setTimeout(() => {
      this.isLoading = false;
      this.successMessage = 'Conta criada com sucesso! Você será redirecionado para o login.';
      // Limpar o formulário
      form.resetForm();
      this.username = '';
      this.password = '';
      this.confirmPassword = '';

      setTimeout(() => {
        this.router.navigate(['']);
      }, 2000); 
    }, 1500); 
  }

  navigateToLogin(): void {
    this.router.navigate(['']);
  }
}