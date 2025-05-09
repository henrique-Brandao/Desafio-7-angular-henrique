import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:3001';

  getVehicles(): Observable<any[]> {
    return this.http.get<{ vehicles: any[] }>(`${this.baseUrl}/vehicles`)
      .pipe(map(res => res.vehicles));
  }

  getVehicleByName(name: string): Observable<any> {
    return this.getVehicles().pipe(
      map(vehicles => vehicles.find(v => v.vehicle.toLowerCase().includes(name.toLowerCase())))
    );
  }

  getVehicleData(vin: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.baseUrl}/vehicleData`, { vin }, { headers });
  }
}
