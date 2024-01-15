import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Vehicle} from "../model/vehicle";

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  getVehicleByRegistrationNum(registrationNum: String): Observable<Vehicle> {
    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });

    return this.http.get<Vehicle>(`${this.baseUrl}/vehicle/num/${registrationNum}`, {headers});
  }

  getAllVehicles(): Observable<Vehicle[]> {
    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });

    return this.http.get<Vehicle[]>(`${this.baseUrl}/vehicle/all`, {headers});
  }
}
