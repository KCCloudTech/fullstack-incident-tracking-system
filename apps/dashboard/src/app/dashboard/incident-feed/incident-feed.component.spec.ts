import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentFeedComponent } from './incident-feed.component';

describe('IncidentFeedComponent', () => {
  let component: IncidentFeedComponent;
  let fixture: ComponentFixture<IncidentFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncidentFeedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidentFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
