import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleSearchCardComponent } from '../vehicle/vehicle-search-card/vehicle-search-card.component';
import { StatsCardsComponent } from '../vehicle/stats-cards-component/stats-cards-component.component';
import { VehicleImageComponent } from '../vehicle/vehicle-image-component/vehicle-image-component.component';
import { VehicleTableComponent } from '../vehicle/vehicle-table-component/vehicle-table-component.component';   
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    VehicleSearchCardComponent,
    StatsCardsComponent,
    VehicleImageComponent,
    VehicleTableComponent,
    NavbarComponent
  ],
  template: `
  <app-navbar/>
    <div class="container mt-4">
      <h2 class="text-center text-primary mb-4">Dashboard FORD</h2>

      <div class="row mb-4">
        <div class="col-md-3">
          <!-- Busca modelo -->
          <app-vehicle-search-card (modelSelected)="onModelSelected($event)"></app-vehicle-search-card>
        </div>

        <div class="col-md-9">
          <!-- KPIs -->
          <app-stats-cards [model]="selectedModel"></app-stats-cards>
        </div>
      </div>

      <!-- Imagem do carro -->
      <div class="row mb-4">
        <div class="col text-center">
          <app-vehicle-image [model]="selectedModel"></app-vehicle-image>
        </div>
      </div>

      <!-- Tabela VIN -->
      <div class="row">
        <div class="col">
          <app-vehicle-table [model]="selectedModel"></app-vehicle-table>
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent {
  selectedModel: string = '';

  onModelSelected(model: string) {
    this.selectedModel = model;
  }
}