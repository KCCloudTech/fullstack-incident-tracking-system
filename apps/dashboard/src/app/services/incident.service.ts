import { Injectable } from '@angular/core';

import axios from 'axios';
import { isNullOrUndefined } from 'util';

import { environment } from '../../environments/environment';
import { Incident, IncidentCollection } from '@fits/api-interfaces';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IncidentService {
  private incidents: IncidentCollection = new IncidentCollection();

  private incidentsSubject = new Subject<IncidentCollection>();
  incidents$ = this.incidentsSubject.asObservable();

  private selectedIncidentSubject = new Subject<Incident>();
  selectedIncident$ = this.selectedIncidentSubject.asObservable();

  constructor() {
    if (!environment.production) {
      window['service'] = this;
    }
  }

  async getIncidentList(): Promise<IncidentCollection> {
    try {
      if (this.incidents.size === 0) {
        const url = `${location.origin}/api/incidents`;
        const resp = await axios.get(url);
        const data = resp.data;
        if (
          !isNullOrUndefined(data) &&
          Array.isArray(data) &&
          data.length > 0
        ) {
          data.forEach((incident: Incident) => {
            this.incidents.set(incident.description.incident_number, incident);
          });
          this.incidentsSubject.next(this.incidents);
        }
      }
      return Promise.resolve(this.incidents);
    } catch (err) {
      return Promise.reject(err.message);
    }
  }

  async getIncidentDetails(key: string): Promise<Incident> {
    try {
      let incident = this.incidents.get(key);
      if (isNullOrUndefined(incident)) {
        const url = `${location.origin}/api/incidents/${key}`;
        const resp = await axios.get(url);
        incident = resp.data;
      }
      if (Incident.isIncident(incident)) {
        this.selectedIncidentSubject.next(incident);
        return Promise.resolve(incident);
      } else {
        return Promise.reject(`Unable to get incident details (${key})`);
      }
    } catch (err) {
      return Promise.reject(err.message);
    }
  }
}
