import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleSearchCardComponent } from './vehicle-search-card.component';

describe('VehicleSearchCardComponent', () => {
  let component: VehicleSearchCardComponent;
  let fixture: ComponentFixture<VehicleSearchCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleSearchCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleSearchCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
