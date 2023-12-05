import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Vehicle} from "../model/vehicle";

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getVehicleById(vehicleId: number): Observable<Vehicle> {
    const url = `${this.baseUrl}/vehicles/${vehicleId}`;
    return this.http.get<Vehicle>(url);
  }
}
