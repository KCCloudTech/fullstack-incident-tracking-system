// import { ExtendedData } from './ExtendedData';

import { StatusUpdateCollection } from './StatusUpdate';

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
}

export class ApparatusModel extends Apparatus {
  private _statusUpdates: StatusUpdateCollection = new StatusUpdateCollection();

  constructor(props: Partial<Apparatus>) {
    super();
    Object.assign(this, props);
  }

  get statusUpdates(): StatusUpdateCollection {
    if (this._statusUpdates.size === 0) {
      this._statusUpdates.init(this.unit_status);
    }
    return this._statusUpdates;
  }
}


export class ApparatusCollection extends Map<string, Apparatus> {

}
