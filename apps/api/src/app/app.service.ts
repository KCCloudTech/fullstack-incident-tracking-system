import { Injectable } from '@nestjs/common';
import { isNullOrUndefined } from 'util';

import { readdirSync, readFileSync, statSync } from 'fs';
import { join } from 'path';

import { stringify } from 'querystring';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { environment } from '../environments/environment';
import {
  Incident,
  IncidentCollection,
  IncidentModel,
  Weather,
} from '@fits/api-interfaces';

@Injectable()
export class AppService {
  errorMessages: Array<string> = new Array<string>();

  filesReady = false;
  filesReason = '';
  files: Array<string> = new Array<string>();

  axiosReady = false;
  axiosReason = '';
  incidents: IncidentCollection = new IncidentCollection();

  constructor() {}

  protected initFiles(): boolean {
    try {
      if (!this.filesReady && this.filesReason.length === 0) {
        const self = this;
        this.errorMessages.length = 0;

        const dir = join(__dirname, 'assets/');
        readdirSync(dir).map((entry) => {
          const name = join(dir, entry);
          if (name.endsWith('.json') && !statSync(name).isDirectory()) {
            self.files.push(entry);
          }
        });
        this.filesReady = true;
      }
    } catch (err) {
      this.filesReason = err.message;
      this.errorMessages.push(
        `Error initializing incident files: ${err.message}`
      );
    } finally {
      this.errorMessages.map((message) => console.log(message));
    }
    return this.filesReady;
  }

  protected loadIncident(id: string): Incident {
    let incident: Incident = null;
    let loaded = false;
    try {
      if (this.initFiles()) {
        this.errorMessages.length = 0;

        id = id.replace('.json', '');
        incident = this.incidents.get(id);
        if (isNullOrUndefined(incident)) {
          const name = `${id}.json`;
          const fqn = join(__dirname, 'assets/', name);
          const data = readFileSync(fqn);

          incident = JSON.parse(data.toString());
          loaded = IncidentModel.isIncident(incident);
          if (loaded) {
            this.incidents.set(id, incident);
          }
        } else {
          loaded = IncidentModel.isIncident(incident);
        }

        if (!loaded) {
          this.errorMessages.push(`Incident (${id}) not found`);
        }
      }
    } catch (err) {
      this.errorMessages.push(`Error loading incident (${id}): ${err.message}`);
    } finally {
      this.errorMessages.map((message) => console.log(message));
    }
    return incident;
  }

  protected async getStation(incident: Incident): Promise<any> {
    let station = null;
    try {
      if (IncidentModel.isIncident(incident)) {
        this.errorMessages.length = 0;

        const id = incident.description.incident_number;

        const q = stringify({
          lat: incident.address.latitude,
          lon: incident.address.longitude,
          limit: 1,
        });
        const resp: AxiosResponse = await axios.get(
          `${environment.weather.stations_url}?${q}`,
          {
            headers: { 'x-api-key': environment.weather.api_key },
          }
        );
        const stations = resp.data.data;
        if (
          isNullOrUndefined(stations) ||
          !Array.isArray(stations) ||
          stations.length !== 1
        ) {
          this.errorMessages.push(
            `Unable to find weather station for incident (${id}). Response: ${resp.data}`
          );
        } else {
          station = stations[0];
        }
      }
    } catch (err) {
      this.errorMessages.push(`Error finding weather station: ${err.message}`);
    } finally {
      this.errorMessages.map((message) => console.log(message));
    }
    return isNullOrUndefined(station)
      ? Promise.reject(null)
      : Promise.resolve(station);
  }

  protected async getWeatherData(
    station: any,
    incident: Incident
  ): Promise<Weather> {
    let weather: Weather = null;
    try {
      this.errorMessages.length = 0;

      const invalidStation = isNullOrUndefined(station);
      const invalidIncident = isNullOrUndefined(incident);

      if (invalidStation) {
        this.errorMessages.push('Unable to get weather for undefined station');
      } else if (invalidIncident) {
        this.errorMessages.push('Unable to get weather for undefined incident');
      } else {
        const id = incident.description.incident_number;
        const startDateTime = incident.description.event_opened.split('T');
        const endDateTime = incident.description.event_closed.split('T');
        const hour = incident.description.hour_of_day;

        const q = stringify({
          station: station.id,
          lat: incident.address.latitude,
          lon: incident.address.longitude,
          start: startDateTime[0],
          end: endDateTime[0],
          tz: incident.fire_department.timezone,
        });
        const resp = await axios.get(`${environment.weather.hourly_url}?${q}`, {
          headers: { 'x-api-key': environment.weather.api_key },
        });

        const data = resp.data.data;
        if (isNullOrUndefined(data)) {
          this.errorMessages.push(
            `Unable to find weather data for incident (${id}). Response: ${resp.data}`
          );
        } else if (Array.isArray(data) && hour < data.length) {
          weather = data[hour];
        } else {
          weather = data;
        }
      }
    } catch (err) {
      this.errorMessages.push(`Error finding weather data: ${err.message}`);
    } finally {
      this.errorMessages.map((message) => console.log(message));
    }
    return Promise.resolve(weather);
  }

  protected async enrichIncident(incident: Incident): Promise<Incident> {
    let enriched: Incident = null;
    try {
      this.errorMessages.length = 0;

      if (isNullOrUndefined(incident)) {
        this.errorMessages.push('Unable to enrich undefined incident');
      } else {
        const id = incident.description.incident_number;
        const station = await this.getStation(incident);

        if (isNullOrUndefined(station)) {
          this.errorMessages.push(
            `Unable to enrich incident (${id}). Undefined station.`
          );
        } else {
          const weather = await this.getWeatherData(station, incident);
          if (isNullOrUndefined(weather)) {
            this.errorMessages.push(
              `Unable to enrich incident (${id}). Undefined weather data.`
            );
          } else {
            incident.weather = weather;
            enriched = incident;
          }
        }
      }
    } catch (err) {
      this.errorMessages.push(`Error enriching incident: ${err.message}`);
    } finally {
      this.errorMessages.map((message) => console.log(message));
    }
    return Promise.resolve(enriched);
  }

  async getIncidentList(): Promise<Array<Incident>> {
    let list: Array<Incident> = null;
    try {
      if (this.incidents.size === 0 && this.initFiles()) {
        const self = this;
        this.errorMessages.length = 0;

        this.files.forEach((file) => {
          const incident = this.loadIncident(file);
          if (!isNullOrUndefined(incident)) {
            self.incidents.set(incident.description.incident_number, incident);
          }
        });
      }
      list = Array.from(this.incidents.values());
    } catch (err) {
      this.errorMessages.push(`Error getting incident list: ${err.message}`);
    } finally {
      this.errorMessages.map((message) => console.log(message));
    }
    return Promise.resolve(list);
  }

  async getIncidentDetails(key: string): Promise<Incident> {
    let incident: Incident = null;
    try {
      this.errorMessages.length = 0;

      incident = this.loadIncident(key);
      if (isNullOrUndefined(incident)) {
        this.errorMessages.push(`Incident (${key}) not found`);
      } else if (isNullOrUndefined(incident.weather)) {
        incident = await this.enrichIncident(incident);
      }
    } catch (err) {
      this.errorMessages.push(`Error getting incident details: ${err.message}`);
    } finally {
      this.errorMessages.map((message) => console.log(message));
    }
    return Promise.resolve(incident);
  }
}
