import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Incident, IncidentCollection } from '@fits/api-interfaces';
import { Subscription } from 'rxjs';
import { IncidentService } from '../../services';

@Component({
  selector: 'fits-incident-list-item',
  templateUrl: './incident-list-item.component.html',
  styleUrls: ['./incident-list-item.component.scss'],
})
export class IncidentListItemComponent implements OnInit, OnDestroy {
  @Input() incidents: IncidentCollection = null;

  incident: Incident = null;
  selectedID = '';
  subscription: Subscription = null;

  constructor(private service: IncidentService) {}

  ngOnInit(): void {
    this.subscription = this.service.selectedIncident$.subscribe((incident) => {
      this.incident = incident;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  shouldOpen(): boolean {
    return this.incident
      ? this.incident.description.incident_number === this.selectedID
      : false;
  }

  shouldClose(): boolean {
    return this.incident
      ? this.incident.description.incident_number !== this.selectedID
      : true;
  }
}
