import {Vehicle} from "./vehicle";

export interface Reservation{
  vehicle : Vehicle,
  spot_id : number,
  startDate: any,
  endDate: any,
  // startTime: any,
  // endTime: any
}
