import {Parking} from "./parking";

export interface Spot {
  spot_id: number
  parking: Parking
  spotNumber: number
  availability: boolean
}

