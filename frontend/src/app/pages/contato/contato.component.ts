import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from '../../components/menu/menu.component';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MenuComponent]
})
export class ContatoComponent implements OnInit {
  formulario!: FormGroup;
  termosAceitos: boolean = false;
  menuExpanded: boolean = true;
  
  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.inicializarFormulario();
  }

  inicializarFormulario(): void {
    this.formulario = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3), this.validarNome]],
      email: ['', [Validators.required, Validators.email, this.validarEmail]],
      cpf: ['', [Validators.required, this.validarCPF]],
      sobrenome: ['', [Validators.required, Validators.minLength(3), this.validarNome]],
      telefone: ['', [Validators.required, this.validarTelefone]],
      contato: ['', Validators.required],
      termosCondicoes: [false, Validators.requiredTrue],
      receberNovidades: [false]
    });
  }


  formatarCPF(event: any): void {
    let cpf = event.target.value.replace(/\D/g, '');
    
    if (cpf.length > 11) {
      cpf = cpf.substring(0, 11);
    }
    
    if (cpf.length > 9) {
      cpf = `${cpf.substring(0, 3)}.${cpf.substring(3, 6)}.${cpf.substring(6, 9)}-${cpf.substring(9)}`;
    } else if (cpf.length > 6) {
      cpf = `${cpf.substring(0, 3)}.${cpf.substring(3, 6)}.${cpf.substring(6)}`;
    } else if (cpf.length > 3) {
      cpf = `${cpf.substring(0, 3)}.${cpf.substring(3)}`;
    }
    
    this.formulario.get('cpf')?.setValue(cpf, { emitEvent: false });
  }

  formatarTelefone(event: any): void {
    let telefone = event.target.value.replace(/\D/g, '');
    
    if (telefone.length > 11) {
      telefone = telefone.substring(0, 11);
    }
    
    if (telefone.length > 6) {
      telefone = `(${telefone.substring(0, 2)}) ${telefone.substring(2, 7)}-${telefone.substring(7)}`;
    } else if (telefone.length > 2) {
      telefone = `(${telefone.substring(0, 2)}) ${telefone.substring(2)}`;
    }
    
    this.formulario.get('telefone')?.setValue(telefone, { emitEvent: false });
  }

  validarNome(control: FormControl): {[key: string]: any} | null {
    const nomeLimpo = control.value?.trim() || '';
    const regex = /^[A-Za-zÀ-ÿ\s]+$/;
    
    return nomeLimpo.length >= 3 && regex.test(nomeLimpo) ? null : { nomeInvalido: true };
  }

  validarEmail(control: FormControl): {[key: string]: any} | null {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(control.value?.trim()) ? null : { emailInvalido: true };
  }

  validarCPF(control: FormControl): {[key: string]: any} | null {
    let cpf = control.value?.replace(/\D/g, '') || '';

    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
      return { cpfInvalido: true };
    }

    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpf[i]) * (10 - i);
    }
    let digito1 = (soma * 10) % 11;
    if (digito1 === 10 || digito1 === 11) digito1 = 0;
    if (digito1 !== parseInt(cpf[9])) return { cpfInvalido: true };

    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += parseInt(cpf[i]) * (11 - i);
    }
    let digito2 = (soma * 10) % 11;
    if (digito2 === 10 || digito2 === 11) digito2 = 0;
    if (digito2 !== parseInt(cpf[10])) return { cpfInvalido: true };

    return null;
  }

 validarTelefone(control: FormControl): {[key: string]: any} | null {
  const numeroLimpo = control.value?.replace(/\D/g, '') || '';
  
  // Verifica se tem 11 dígitos
  if (numeroLimpo.length !== 11) {
    return { telefoneInvalido: true };
  }
  
  // Extrai o DDD e o primeiro dígito do número
  const ddd = numeroLimpo.substring(0, 2);
  const primeiroDígito = numeroLimpo.substring(2, 3);
  
  // Lista de DDDs válidos no Brasil
  const dddsValidos = [
    // São Paulo
    '11', '12', '13', '14', '15', '16', '17', '18', '19',
    // Rio de Janeiro e Espírito Santo
    '21', '22', '24', '27', '28',
    // Minas Gerais
    '31', '32', '33', '34', '35', '37', '38',
    // Paraná e Santa Catarina
    '41', '42', '43', '44', '45', '46', '47', '48', '49',
    // Rio Grande do Sul
    '51', '53', '54', '55',
    // Centro-Oeste e parte do Norte
    '61', '62', '63', '64', '65', '66', '67', '68', '69',
    // Bahia e Sergipe
    '71', '73', '74', '75', '77', '79',
    // Resto do Nordeste
    '81', '82', '83', '84', '85', '86', '87', '88', '89',
    // Parte da região Norte
    '91', '92', '93', '94', '95', '96', '97', '98', '99'
  ];
  
  const dddValido = dddsValidos.includes(ddd);
  const comecaComNove = primeiroDígito === '9';
  
  if (!dddValido) {
    return { dddInvalido: true };
  }
  
  if (!comecaComNove) {
    return { naoComecaComNove: true };
  }
  
  return null;
}

  onTermosChange(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    this.termosAceitos = checkbox.checked;
  }

  getFieldClass(controlName: string): string {
    const control = this.formulario.get(controlName);
    if (!control) return '';
    
    if (control.touched || control.dirty) {
      return control.valid ? 'valido' : 'invalido';
    }
    return '';
  }

getErrorMessage(controlName: string): string {
  const control = this.formulario.get(controlName);
  if (!control || !control.errors || (!control.touched && !control.dirty)) {
    return '';
  }

  const errors = control.errors;
  
  if (errors['required']) return `Campo obrigatório`;
  if (controlName === 'nome' || controlName === 'sobrenome') return 'Insira um nome válido';
  if (controlName === 'email') return 'Insira um e-mail válido';
  if (controlName === 'cpf') return 'Insira um CPF válido';
  if (controlName === 'telefone') {
    if (errors['dddInvalido']) return 'DDD inválido';
    if (errors['naoComecaComNove']) return 'Celular deve começar com 9';
    return 'Telefone inválido (formato: (xx) 9xxxx-xxxx)';
  }
  if (controlName === 'contato') return 'Selecione uma opção';
  
  return 'Campo inválido';
  }

  onSubmit(): void {
    if (this.formulario.invalid) {
      
      Object.keys(this.formulario.controls).forEach(key => {
        this.formulario.get(key)?.markAsTouched();
      });
      
     
      Swal.fire({
        title: "Erro!",
        text: "Por favor, corrija os campos destacados em vermelho.",
        icon: "error",
        confirmButtonText: "OK"
      });
      return;
    }

    Swal.fire({
      title: "Sucesso!",
      text: "Formulário enviado com sucesso!",
      icon: "success",
      confirmButtonText: "OK"
    }).then(() => {
      this.formulario.reset();
      this.termosAceitos = false;
    });
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate([""]);
  }
}