import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentApparatusListComponent } from './incident-apparatus-list.component';

describe('IncidentApparatusListComponent', () => {
  let component: IncidentApparatusListComponent;
  let fixture: ComponentFixture<IncidentApparatusListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncidentApparatusListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidentApparatusListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
