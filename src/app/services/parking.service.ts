import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Spot} from "../model/spot";
import {Parking} from "../model/parking";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ParkingService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  getAllParking() {
    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });

    const response = this.http.get(this.baseUrl + '/parking/all', {headers});

    response.subscribe((data: any) => {
      data = response
    });
  }

  getParkingByName(parkingName: String): Observable<Parking> {
    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });

    return this.http.get<Parking>(`${this.baseUrl}/parking/${parkingName}`, {headers});
  }

  getSpotByParkingIdAndSpotNumber(parkingId: number, spotNum: String): Observable<Spot> {
    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    return this.http.get<Spot>(`${this.baseUrl}/spot/${parkingId}/${spotNum}`, {headers});
  }
}
