import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentCollectionComponent } from './incident-map.component';

describe('IncidentCollectionComponent', () => {
  let component: IncidentCollectionComponent;
  let fixture: ComponentFixture<IncidentCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncidentCollectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidentCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
