import { Component, Input, OnInit } from '@angular/core';
import { Incident } from '@fits/api-interfaces';

@Component({
  selector: 'fits-incident-handle',
  templateUrl: './incident-handle.component.html',
  styleUrls: ['./incident-handle.component.scss'],
})
export class IncidentHandleComponent implements OnInit {
  private _incident: Incident = null;

  @Input()
  get incident(): Incident {
    return this._incident;
  }
  set incident(value: Incident) {
    this._incident = this.incident;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
