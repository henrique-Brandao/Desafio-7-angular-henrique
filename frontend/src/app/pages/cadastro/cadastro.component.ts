import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {

  username = ''; 
  password = '';
  confirmPassword = '';
  nome = ''; 

  isLoading = false;
  errorMessage = '';
  successMessage = '';

  private apiUrl = 'http://localhost:3001';

  constructor(private router: Router, private http: HttpClient) {} 

  onSubmit(form: NgForm): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (form.invalid) {
      this.errorMessage = 'Por favor, preencha todos os campos obrigatórios.';
      Object.keys(form.controls).forEach(field => {
        form.controls[field].markAsTouched({ onlySelf: true });
      });
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'As senhas não coincidem.';
      return;
    }

    this.isLoading = true;

    const payload = {
      email: this.username, 
      password: this.password,
      nome: this.nome 
    };

    this.http.post<any>(`${this.apiUrl}/register`, payload).subscribe({
      next: (response) => {
        console.log('Resposta do registro:', response);
        this.successMessage = 'Conta criada com sucesso! Você será redirecionado para o login.';
        this.isLoading = false;
        form.resetForm();
        this.username = '';
        this.password = '';
        this.confirmPassword = '';
        this.nome = '';

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (err) => {
        this.isLoading = false;
        if (err.error && err.error.message) {
          this.errorMessage = err.error.message;
        } else if (err.status === 409) {
          this.errorMessage = 'Este e-mail já está cadastrado.';
        }
        else {
          this.errorMessage = 'Erro ao criar conta. Tente novamente mais tarde.';
        }
        console.error('Erro no registro:', err);
      }
    });
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
}