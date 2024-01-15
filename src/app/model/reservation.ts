import {Vehicle} from "./vehicle";
import {Spot} from "./spot";

export interface Reservation{
  vehicle_id: Vehicle,
  spots: Spot[],
  startDate: any,
  endDate: any,
  // startTime: any,
  // endTime: any
}
