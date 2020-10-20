import { Component, OnDestroy, OnInit } from '@angular/core';
import { Incident } from '@fits/api-interfaces';
import { Subscription } from 'rxjs';
import { IncidentService } from '../../services';

@Component({
  selector: 'fits-incident-details',
  templateUrl: './incident-details.component.html',
  styleUrls: ['./incident-details.component.scss'],
})
export class IncidentDetailsComponent implements OnInit, OnDestroy {
  incident: Incident;
  subscription: Subscription;

  constructor(private service: IncidentService) {}

  ngOnInit(): void {
    this.subscription = this.service.selectedIncident$.subscribe((incident) => {
      this.incident = incident;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
