import {Vehicle} from "./vehicle";
import {Spot} from "./spot";

export interface Reservation{
  vehicle : Vehicle
  spot : Spot
  dateStart: any
  dateEnd :any
}
