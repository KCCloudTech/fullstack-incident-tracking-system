import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentListItemComponent } from './incident-list-item.component';

describe('IncidentListItemComponent', () => {
  let component: IncidentListItemComponent;
  let fixture: ComponentFixture<IncidentListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncidentListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidentListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
