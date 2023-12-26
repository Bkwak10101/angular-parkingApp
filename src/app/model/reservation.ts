import {Vehicle} from "./vehicle";
import {Spot} from "./spot";

export interface Reservation{
  vehicle: Vehicle,
  spot: string,
  startDate: any,
  endDate: any,
  // startTime: any,
  // endTime: any
}
