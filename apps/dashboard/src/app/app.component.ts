import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { Subscription } from 'rxjs';

import { IncidentCollection } from '@fits/api-interfaces';
import { IncidentService } from './services';

@Component({
  selector: 'fits-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    IncidentService
  ]
})
export class AppComponent implements OnInit, OnDestroy {
  errorMessages: Array<string> = new Array<string>();

  subscription: Subscription;

  constructor(
    private router: Router,
    private service: IncidentService
  ) {}

  async ngOnInit(): Promise<void> {
    const self = this;
    this.errorMessages.length = 0;
    try {
      this.subscription = this.router.events.subscribe(async (event) => {
        if (event instanceof NavigationEnd) {
          const url: string = event.urlAfterRedirects;
          const base = '/incidents';
          if (url.startsWith(base)) {
            if (url.length > base.length) {
              const slash = url.lastIndexOf('/');
              const id = url.substr(slash + 1);
              self.setSelectedIncidentID(id);
            }
          }
        }
      });
    } catch (err) {
      this.errorMessages.push(`Error initializing app: (${err.message})`);
    } finally {
      this.errorMessages.map((message) => console.log(message));
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  protected async setSelectedIncidentID(id: string): Promise<void> {
    this.errorMessages.length = 0;
    try {
      await this.service.getIncidentDetails(id);
      await this.router.navigate(['incidents', id]);
    } catch (err) {
      this.errorMessages.push(
        `Error selecting first incident: (${err.message})`
      );
    } finally {
      this.errorMessages.map((message) => console.log(message));
    }
  }

  protected async selectFirstIncident(): Promise<void> {
    this.errorMessages.length = 0;
    try {
      const incidents: IncidentCollection = await this.service.getIncidentList();
      if (!isNullOrUndefined(incidents) && incidents.size > 0) {
        const id = incidents.sortedKeys[0];
        this.setSelectedIncidentID(id);
      } else {
        this.errorMessages.push(
          `Error selecting first incident: empty incident list`
        );
      }
    } catch (err) {
      this.errorMessages.push(`Error selecting first incident: ${err.message}`);
    } finally {
      this.errorMessages.map((message) => console.log(message));
    }
  }

  protected async setSelectedIncident(id: string): Promise<void> {
    this.errorMessages.length = 0;
    try {
      const incident = await this.service.getIncidentDetails(id);
      if (isNullOrUndefined(incident)) {
        this.errorMessages.push(
          `Error setting selected incident (${id}). Incident not found`
        );
      }
    } catch (err) {
      this.errorMessages.push(
        `Error setting selected incident (${id}): ${err.message}`
      );
    } finally {
      this.errorMessages.map((message) => console.log(message));
    }
  }
}
