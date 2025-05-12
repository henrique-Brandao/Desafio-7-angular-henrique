import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Veiculo, VinInfos } from '../models/car';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  http = inject(HttpClient)

  getVeiculos(): Observable<Veiculo[]> {
    return this.http.get<Veiculo[]>("http://localhost:3001/vehicles")
  }

  getVinInfos(vin: string) {
    return this.http.post<VinInfos>("http://localhost:3001/vehicleData", { vin })
  }
}
