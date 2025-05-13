
// login.component.ts
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

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {}

  onSubmit(form: NgForm) {
    if (!form.valid) return;

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.loginService.login(this.username, this.password).subscribe({
      next: (res) => {
        this.isLoading = false;

        // Salvando dados no localStorage
        localStorage.setItem('usuarioFord', JSON.stringify(res));

        this.successMessage = 'Login realizado com sucesso!';
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 1000);
      },
      error: (err) => {
        this.isLoading = false;
        if (err.status === 401) {
          this.errorMessage = 'Usuário ou senha incorretos.';
        } else {
          this.errorMessage = 'Erro ao tentar fazer login.';
        }
      }
    });
  }
}
