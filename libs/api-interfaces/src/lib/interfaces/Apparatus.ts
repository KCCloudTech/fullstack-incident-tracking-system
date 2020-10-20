// import { ExtendedData } from './ExtendedData';

import { StatusUpdate } from './StatusUpdate';

export class Apparatus {
  car_id: string;
  distance: number;
  // extended_data: Partial<ExtendedData>;
  geohash: string;
  personnel: [];
  shift: string;
  station: string;
  unit_id: string;
  unit_type: string;
  unit_status: object;

  constructor(props: Partial<Apparatus>) {
    Object.assign(this, props);
  }
}

export class StatusUpdateMap extends Map<string, StatusUpdate> {
  private _keys: Array<string> = new Array<string>();

  get keysByTime(): Array<string> {
    if (this._keys.length === 0) {
      this._keys = Array.from(this.keys());
    }
    return this._keys;

    // TODO implement with moment.js
    // try {
    //   if (this._keys.length === 0) {
    //     const self = this;
    //     this.forEach((status: StatusUpdate, key: string) => {
    //       const timestamp = status.timestamp;
    //     });
    //   }
    // } catch (err) {
    //   console.log(err.message);
    // }
    // return this._keys;
  }
}

export class ApparatusModel extends Apparatus {
  private _statusUpdates: StatusUpdateMap = new StatusUpdateMap();

  constructor(props: Partial<Apparatus>) {
    super(props);
  }

  get statusUpdates(): StatusUpdateMap {
    if (this._statusUpdates.size === 0) {
      const self = this;
      Object.keys(this.unit_status).forEach((key) => {
        self._statusUpdates.set(key, self.unit_status[key]);
      });
    }
    return this._statusUpdates;
  }
}
