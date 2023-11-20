import {Parking} from "./parking";

export interface Spot {
  parking: Parking
  spotNumber: number
  availability: boolean
}
