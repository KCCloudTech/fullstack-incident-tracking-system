import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentWeatherComponent } from './incident-weather.component';

describe('IncidentWeatherComponent', () => {
  let component: IncidentWeatherComponent;
  let fixture: ComponentFixture<IncidentWeatherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncidentWeatherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidentWeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
