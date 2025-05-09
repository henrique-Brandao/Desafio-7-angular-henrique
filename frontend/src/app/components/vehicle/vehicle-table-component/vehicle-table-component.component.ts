import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-vehicle-table',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="card p-3 shadow-sm">
      <label for="codeSearch" class="form-label">Buscar por código do veículo</label>
      <input
        id="codeSearch"
        class="form-control mb-3"
        placeholder="Ex: 2FRHDUYS2Y63NHD22454"
        [formControl]="codeControl"
      />

      <table class="table table-striped" *ngIf="filteredData.length">
        <thead>
          <tr>
            <th>Modelo</th>
            <th>Versão</th>
            <th>Conectado</th>
            <th>Atualizado</th>
            <th>Código</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let item of filteredData">
            <td>{{ item.modelo }}</td>
            <td>{{ item.versao }}</td>
            <td>{{ item.conectado }}</td>
            <td>{{ item.atualizado }}</td>
            <td>{{ item.codigo }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `
})
export class VehicleTableComponent implements OnInit {
  @Input() model: string = '';
  codeControl = new FormControl('');
  allData = [
    {
      modelo: 'Ford Edge',
      versao: 'Titanium',
      conectado: 'Sim',
      atualizado: 'Sim',
      codigo: '2FRHDUYS2Y63NHD22454'
    }
  ];

  filteredData = this.allData;

  ngOnInit(): void {
    this.codeControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(code => {
        this.filteredData = this.allData.filter(item =>
          item.codigo.toLowerCase().includes((code || '').toLowerCase())
        );
      });
  }
}
