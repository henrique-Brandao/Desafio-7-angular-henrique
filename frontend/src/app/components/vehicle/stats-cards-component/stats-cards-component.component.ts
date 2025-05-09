import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../../services/dashboard.service';
import { inject } from '@angular/core';

@Component({
  selector: 'app-stats-cards',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="row text-center g-3">
      <div class="col-md-4">
        <div class="card p-3 border-primary border-2 shadow-sm">
          <h5>Total de Vendas</h5>
          <p class="fs-4 text-primary">{{ stats.volumetotal }} Unid.</p>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card p-3 border-success border-2 shadow-sm">
          <h5>Conectados</h5>
          <p class="fs-4 text-success">{{ stats.connected }} Unid.</p>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card p-3 border-warning border-2 shadow-sm">
          <h5>Update Software</h5>
          <p class="fs-4 text-warning">{{ stats.softwareUpdates }} Unid.</p>
        </div>
      </div>
    </div>
  `
})
export class StatsCardsComponent implements OnChanges {
  @Input() model: string = '';

  stats = {
    volumetotal: 0,
    connected: 0,
    softwareUpdates: 0
  };

  private service = inject(DashboardService);

  ngOnChanges(): void {
    if (this.model) {
      this.service.getVehicleByName(this.model).subscribe(vehicle => {
        if (vehicle) {
          this.stats = {
            volumetotal: vehicle.volumetotal,
            connected: vehicle.connected,
            softwareUpdates: vehicle.softwareUpdates
          };
        }
      });
    }
  }
}
