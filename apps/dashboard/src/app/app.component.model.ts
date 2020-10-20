import { Incident, IncidentMap } from '@fits/api-interfaces';
import { Observable } from 'rxjs';

export class AppComponentModel {
  incidents$: Observable<IncidentMap> = new Observable<IncidentMap>(observer => {
    observer.next();
  });
  selectedIncident$: Observable<Incident> = new Observable<Incident>();
  selectedIncidentID$: Observable<string> = new Observable<string>();
}
