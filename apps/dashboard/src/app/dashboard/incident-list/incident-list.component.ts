import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Incident, IncidentCollection } from '@fits/api-interfaces';
import { Subscription } from 'rxjs';
import { IncidentService } from '../../services';

@Component({
  selector: 'fits-incident-list',
  templateUrl: './incident-list.component.html',
  styleUrls: ['./incident-list.component.scss'],
})
export class IncidentListComponent implements OnInit, OnDestroy {
  incidents: IncidentCollection = null;
  selectedIncident: Incident = null;

  listSubscription: Subscription;
  selectedSubscription: Subscription;

  @Output() incidentSelectedEvent = new EventEmitter<Incident>();

  constructor(private service: IncidentService) {}

  ngOnInit(): void {
    this.listSubscription = this.service.incidents$.subscribe((incidents) => {
      this.incidents = incidents;
    });
    this.selectedSubscription = this.service.selectedIncident$.subscribe((incident) => {
      this.onIncidentSelected(incident);
    });
  }

  onIncidentSelected(incident: Incident) {
    this.selectedIncident = incident;
    this.incidentSelectedEvent.emit(incident);
  }

  ngOnDestroy(): void {
    this.listSubscription.unsubscribe();
    this.selectedSubscription.unsubscribe();
  }
}
