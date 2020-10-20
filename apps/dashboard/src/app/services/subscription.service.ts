import { Injectable } from '@angular/core';
import { AppComponentModel } from '../app.component.model';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  readonly model: AppComponentModel = new AppComponentModel();

  constructor() { }
}
