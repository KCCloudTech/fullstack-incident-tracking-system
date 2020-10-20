import { Component, OnDestroy, OnInit } from '@angular/core';
import { Apparatus, Incident } from '@fits/api-interfaces';
import { Subscription } from 'rxjs';
import { IncidentService } from '../../services';

@Component({
  selector: 'fits-incident-apparatus-list',
  templateUrl: './incident-apparatus-list.component.html',
  styleUrls: ['./incident-apparatus-list.component.scss']
})
export class IncidentApparatusListComponent implements OnInit, OnDestroy {
  incident: Incident;
  apparatusList: Array<Apparatus> = new Array<Apparatus>();
  selectedApparatus: Apparatus = null;
  subscription: Subscription = null;

  constructor(private service: IncidentService) { }

  ngOnInit(): void {
    this.subscription = this.service.selectedIncident$.subscribe((incident) => {
      this.incident = incident;
      this.apparatusList = incident.apparatus;
    });
  }

  onClick(apparatus: Apparatus) {
    this.selectedApparatus = apparatus;
    console.log(apparatus);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
