import { Component, inject, OnInit } from '@angular/core';
import { CardComponent } from "../../components/card/card.component";
import { CarTableComponent } from "../../components/car-table/car-table.component";
import { DashboardService } from '../../services/dashboard.service';
import { Veiculo, VinInfos } from '../../models/car';
import { MenuComponent } from '../../components/menu/menu.component';
import { MenuService } from '../../services/menu.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CardComponent, CarTableComponent, MenuComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  [x: string]: any;
  dashboardService = inject(DashboardService);
  menuService = inject(MenuService);
  router = inject(Router);
  menuExpanded = false;
  veiculos: Veiculo[] = [];
  veiculoSelecionado: Veiculo = { id: -1, connected: 0, volumetotal: 0, softwareUpdates: 0, vehicle: "", img: "", vin: "" };
  
  vinInfos: VinInfos = { id: -1, lat: 0, long: 0, nivelCombustivel: 0, odometro: 0, status: "" };

  ngOnInit() {
  
  this.menuService.menuExpanded$.subscribe(expanded => {
    this.menuExpanded = expanded;
  });
  
  this.dashboardService.getVeiculos().subscribe({
    error: () => {},
    next: (veiculos) => {
      this.veiculos = Object.values(veiculos) as Veiculo[];
    }
  });
}

  // No seu dashboard.component.ts
selecionarVeiculo(veiculo: Veiculo) {
  this.veiculoSelecionado = veiculo;

  this.dashboardService.getVinInfos(veiculo.vin).subscribe({
    error: () => {},
    next: (vinInfos) => {
      this.vinInfos = vinInfos;
    }
  });
  
}



onChangeSelect(event: any) {
  const veiculoId = event.target.value;
  // Encontrar o veículo pelo ID
  const veiculoSelecionado = this.veiculos.find(v => v.id.toString() === veiculoId);
  
  if (veiculoSelecionado) {
    this.veiculoSelecionado = veiculoSelecionado;
    
    // Buscar as informações do VIN
    this.dashboardService.getVinInfos(veiculoSelecionado.vin).subscribe({
      error: () => {},
      next: (vinInfos) => {
        this.vinInfos = vinInfos;
      }
    });
  }
}

toggleMenu() {
    this.menuExpanded = !this.menuExpanded;
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate([""]);
  }
} 