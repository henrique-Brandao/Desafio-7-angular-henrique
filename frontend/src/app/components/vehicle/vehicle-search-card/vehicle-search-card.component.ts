import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import { DashboardService } from '../../../services/dashboard.service';

@Component({
  selector: 'app-vehicle-search-card',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="card shadow-sm p-3">
      <input type="text" class="form-control" placeholder="Buscar modelo de veículo" [formControl]="modelControl">
      <div *ngIf="options.length" class="mt-2">
        <ul class="list-group">
          <li
            class="list-group-item list-group-item-action"
            *ngFor="let opt of options"
            (click)="selectModel(opt.vehicle)"
          >
            {{ opt.vehicle }}
          </li>
        </ul>
      </div>
    </div>
  `
})
export class VehicleSearchCardComponent {
  @Output() modelSelected = new EventEmitter<string>();

  modelControl = new FormControl('');
  options: any[] = [];
  private service = inject(DashboardService);

  ngOnInit() {
    this.modelControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(value => this.service.getVehicles()),
      map(vehicles =>
        vehicles.filter(v =>
          v.vehicle.toLowerCase().includes(this.modelControl.value?.toLowerCase() || '')
        )
      )
    ).subscribe(result => {
      this.options = result;
    });
  }

  selectModel(model: string) {
    this.modelSelected.emit(model);
    this.options = []; // limpa opções após seleção
    this.modelControl.setValue(model, { emitEvent: false }); // mostra nome no input sem disparar evento
  }
}
