import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Incident } from '@fits/api-interfaces';
import { Subscription } from 'rxjs';
import { IncidentService } from '../../services';

@Component({
  selector: 'fits-incident-weather',
  templateUrl: './incident-weather.component.html',
  styleUrls: ['./incident-weather.component.scss']
})
export class IncidentWeatherComponent implements OnInit, OnDestroy {
  incident: Incident;
  subscription: Subscription;

  constructor(private service: IncidentService) { }

  ngOnInit(): void {
    this.subscription = this.service.selectedIncident$.subscribe((incident) => {
      this.incident = incident;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
