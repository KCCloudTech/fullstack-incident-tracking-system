import { Component, Input, OnInit } from '@angular/core';
import { Address } from '@fits/api-interfaces';

@Component({
  selector: 'fits-incident-address',
  templateUrl: './incident-address.component.html',
  styleUrls: ['./incident-address.component.scss']
})
export class IncidentAddressComponent implements OnInit {
  @Input() address: Address = null;

  constructor() { }

  ngOnInit(): void {
  }

}
