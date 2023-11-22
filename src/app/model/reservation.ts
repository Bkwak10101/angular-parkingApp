import {Vehicle} from "./vehicle";
import {Spot} from "./spot";

export interface Reservation{
  vehicle : Vehicle
  spot : Spot
  startDate: any,
  endDate: any,
  startTime: any,
  endTime: any
}
