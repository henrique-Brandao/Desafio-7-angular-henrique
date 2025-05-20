import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/login.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  showPassword = false;

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {}

 
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  
  onSubmit(form: NgForm): void {
    
    if (!form.valid) {
      Object.keys(form.controls).forEach(field => {
        const control = form.controls[field];
        control.markAsTouched({ onlySelf: true });
      });
      this.errorMessage = "Por favor, preencha todos os campos obrigatórios."; 
      this.successMessage = ''; 
      return; 
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';


    this.loginService.login(this.username, this.password).subscribe({
      next: (res) => {
        this.isLoading = false;
        localStorage.setItem('usuarioFord', JSON.stringify(res)); 
        this.successMessage = 'Login realizado com sucesso! Redirecionando...';
        setTimeout(() => {
          this.router.navigate(['/home']); 
        }, 1000);
      },
      error: (err) => {
        this.isLoading = false;
        if (err.status === 401) {
          this.errorMessage = 'Usuário ou senha incorretos.';
        } else if (err.error && typeof err.error === 'string' && err.error.includes("User not found")) {
            this.errorMessage = 'Usuário não encontrado.';
        } else if (err.error && err.error.message) {
            this.errorMessage = err.error.message;
        }
        else {
          this.errorMessage = 'Erro ao tentar fazer login. Verifique suas credenciais ou tente novamente mais tarde.';
        }
      }
    });
  }

  navigateToRegister(): void {
    this.router.navigate(['/cadastro']);
    console.log('Navegar para criar conta'); 
    
  }
}