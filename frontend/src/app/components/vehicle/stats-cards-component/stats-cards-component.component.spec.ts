import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsCardsComponentComponent } from './stats-cards-component.component';

describe('StatsCardsComponentComponent', () => {
  let component: StatsCardsComponentComponent;
  let fixture: ComponentFixture<StatsCardsComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatsCardsComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatsCardsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
