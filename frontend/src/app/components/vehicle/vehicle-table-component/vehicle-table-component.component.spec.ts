import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleTableComponentComponent } from './vehicle-table-component.component';

describe('VehicleTableComponentComponent', () => {
  let component: VehicleTableComponentComponent;
  let fixture: ComponentFixture<VehicleTableComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleTableComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleTableComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
