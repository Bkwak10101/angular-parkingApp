import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../model/user";
import {Vehicle} from "../model/vehicle";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  public addUser(user: User): Observable<User> {
    const headers = {'content-type': 'application/json'}
    console.log(user)
    return this.http.post<User>(this.baseUrl + "/user/signup", user, {'headers': headers})
  }

  public addVehicle(vehicle: Vehicle): Observable<Vehicle> {
    const headers = {'content-type': 'application/json'}
    return this.http.post<Vehicle>(this.baseUrl + "/vehicle/create", vehicle, {'headers': headers})
  }

  public validateLogin(user: User): Observable<User> {
    const headers = {'content-type': 'application/json'}
    return this.http.post<User>(this.baseUrl + "/api/login", user, {'headers': headers})
  }

  //TODO: LOGIN:
  // Return JSON Web Token
}
