import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Reservation} from "../model/reservation";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private baseUrl = 'http://localhost:8080';
  constructor(private http: HttpClient) {
  }

  public addReservation(reservation: Reservation) {
    console.log(reservation)
    const headers = {'content-type': 'application/json'}
    return this.http.post<Reservation>(this.baseUrl + "/reservation/add", reservation, {'headers': headers})
  }

// TODO: extendReservation()

}
