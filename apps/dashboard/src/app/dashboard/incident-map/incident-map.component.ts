import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';

import { Incident, IncidentMap } from '@fits/api-interfaces';
import { IncidentService } from '../../services';
import { GoogleMap } from '@angular/google-maps';

export interface MarkerInfo {
  type: string;
  subtype: string;
  address_line1: string;
  city: string;
  state: string;
  postal_code: string;
}

export class Marker {
  id: string;
  geo: google.maps.LatLngLiteral;
  info: MarkerInfo;

  constructor(props: Partial<Marker>) {
    Object.assign(this, props);
  }
}

@Component({
  selector: 'fits-incident-map',
  templateUrl: './incident-map.component.html',
  styleUrls: ['./incident-map.component.scss'],
})
export class IncidentMapComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(GoogleMap) map: GoogleMap;

  errorMessages: Array<string> = new Array<string>();

  // mapsLoaded$: Observable<boolean> = new Observable<boolean>();
  mapsSubscription: Subscription;

  googleMap: google.maps.Map = null;
  infoWindow: google.maps.InfoWindow = null;

  incidents: IncidentMap = null;
  selectedIncident: Incident = null;

  listSubscription: Subscription = null;
  selectedSubscription: Subscription = null;

  center: google.maps.LatLngLiteral = { lat: 37.5344687, lng: -77.4990999 };
  markerOptions: google.maps.MarkerOptions = { draggable: false };

  markers: Map<string, Marker> = new Map<string, Marker>();

  constructor(
    private service: IncidentService // private httpClient: HttpClient
  ) {}

  async ngOnInit(): Promise<void> {
    // this.mapsLoaded$ = this.httpClient
    //   .jsonp(
    //     'https://maps.googleapis.com/maps/api/js?key=AIzaSyD1GZ-0nqIccjYUlDf-UmnezOK42j8tSXI',
    //     'callback'
    //   )
    //   .pipe(
    //     map(() => true),
    //     catchError(() => of(false))
    //   );

    if (window.google && window.google.maps) {
      this.infoWindow = new google.maps.InfoWindow();
      this.addMarkers();
    }
    this.listSubscription = this.service.incidents$.subscribe((incidents) => {
      this.incidents = incidents;
      this.addMarkers();
    });
    this.selectedSubscription = this.service.selectedIncident$.subscribe(
      (incident) => {
        this.selectedIncident = incident;
      }
    );
    this.service.getIncidentList();
  }

  onMarkerClick(event: google.maps.MouseEvent) {
    // if (mapMarker) {
    //   const key = mapMarker.getTitle();
    //   const marker = this.markers.get(key);
    //   if (marker) {
    //     this.infoWindow.setContent(
    //       `${marker.info.type}<br/>${marker.info.subtype}<br/>${key}`
    //     );
    //     this.infoWindow.open(this.map.googleMap, mapMarker);
    //     this.infoWindow.open(this.googleMap, mapMarker);
    //   }
    // }
  }

  protected addMarkers() {
    if (this.googleMap && this.infoWindow && this.incidents && this.incidents.size > 0) {
      this.incidents.forEach((incident: Incident) => {
        const description = incident.description;
        const address = incident.address;
        const key = incident.description.incident_number;
        const marker = new Marker({
          id: key,
          geo: {
            lat: address.latitude,
            lng: address.longitude,
          },
          info: {
            type: description.type,
            subtype: description.subtype,
            address_line1: address.address_line1,
            city: address.city,
            state: address.state,
            postal_code: address.postal_code,
          },
        });
        this.markers.set(key, marker);

        // const marker2 = new google.maps.Marker({
        //   map: this.map.googleMap,
        //   title: key,
        //   position: {
        //     lat: address.latitude,
        //     lng: address.longitude,
        //   },
        //   draggable: false,
        // });
        // google.maps.event.addListener(marker, 'click', () => {
        //   this.infoWindow.setContent(
        //     `${info.type}<br/>${info.subtype}<br/>${key}`
        //   );
        //   this.infoWindow.open(this.map.googleMap, marker);
        // });
      });
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (window.google && window.google.maps && this.map) {
        this.googleMap = this.map.googleMap;
        this.addMarkers();
      }
    }, 10);
  }

  ngOnDestroy(): void {
    this.listSubscription.unsubscribe();
    this.selectedSubscription.unsubscribe();
  }
}
