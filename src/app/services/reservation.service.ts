import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Reservation} from "../model/reservation";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  public addReservation(reservation: Reservation): Observable<Reservation> {
    const headers = {'content-type': 'application/json'}
    return this.http.post<Reservation>(this.baseUrl + "/reservation/add", reservation, {'headers': headers})
  }

// TODO: extendReservation()

}

