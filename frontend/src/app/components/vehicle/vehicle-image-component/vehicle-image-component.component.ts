import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../../services/dashboard.service';
import { inject } from '@angular/core';

@Component({
  selector: 'app-vehicle-image',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="imageUrl" class="card shadow-sm p-3">
      <img [src]="imageUrl" [alt]="model" class="img-fluid rounded mx-auto d-block" style="max-height: 300px;" />
    </div>
  `
})
export class VehicleImageComponent implements OnChanges {
  @Input() model: string = '';
  imageUrl: string = '';

  private service = inject(DashboardService);

  ngOnChanges(): void {
    if (this.model) {
      this.service.getVehicleByName(this.model).subscribe(vehicle => {
        this.imageUrl = vehicle?.img || '';
      });
    }
  }
}