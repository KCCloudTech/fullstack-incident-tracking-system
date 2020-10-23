export class StatusUpdate {
  name: string;
  geohash: string;
  latitude: number;
  longitude: number;
  timestamp: string;
}

export class StatusUpdateCollection extends Map<string, StatusUpdate> {
  private _keysByTime: Array<string> = new Array<string>();

  init(unit_status: object) {
    if (this.size === 0) {
      Object.keys(unit_status).forEach((name) => {
        this.set(name, unit_status[name]);
      });
    }
  }

  get keysByTime(): Array<string> {
    if (this._keysByTime.length === 0) {
      this._keysByTime = Array.from(this.keys());
    }
    return this._keysByTime;
  }
}
