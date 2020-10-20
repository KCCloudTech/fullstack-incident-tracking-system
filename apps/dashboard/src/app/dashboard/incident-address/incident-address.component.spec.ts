import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentAddressComponent } from './incident-address.component';

describe('IncidentAddressComponent', () => {
  let component: IncidentAddressComponent;
  let fixture: ComponentFixture<IncidentAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncidentAddressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidentAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
