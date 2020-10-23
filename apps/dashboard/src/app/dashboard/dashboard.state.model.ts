import { IncidentService } from '../services';


export class StateModel {
  constructor(protected service: IncidentService) { }
}


export class StatusUpdateStateModel extends StateModel {
  constructor(protected service: IncidentService) {
    super(service);
  }

}


export class ApparatusStateModel extends StateModel {
  selectedStatusUpdate: Status

  constructor(protected service: IncidentService) {
    super(service);
  }
}


export class IncidentStateModel extends StateModel {
  constructor(protected service: IncidentService) {
    super(service);
  }
}


export class DashboardStateModel extends StateModel {
  constructor(protected service: IncidentService) {
    super(service);
  }
}


