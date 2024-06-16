import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../model/user";
import {Vehicle} from "../model/vehicle";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _baseUrl = 'http://localhost:8080';

  constructor(private _http: HttpClient) {
  }


  get baseUrl(): string {
    return this._baseUrl;
  }

  set baseUrl(value: string) {
    this._baseUrl = value;
  }

  get http(): HttpClient {
    return this._http;
  }

  set http(value: HttpClient) {
    this._http = value;
  }

  public addUser(user: User): Observable<User> {
    const headers = {'content-type': 'application/json'}
    console.log(user)
    return this._http.post<User>(this._baseUrl + "/user/signup", user, {'headers': headers})
  }

  public addVehicle(vehicle: Vehicle): Observable<Vehicle> {
    const headers = {'content-type': 'application/json'}
    return this._http.post<Vehicle>(this._baseUrl + "/vehicle/create", vehicle, {'headers': headers})
  }

  public validateLogin(user: User): Observable<User> {
    const headers = {'content-type': 'application/json'}
    return this._http.post<User>(this._baseUrl + "/api/login", user, {'headers': headers})
  }

  //TODO: LOGIN:
  // Return JSON Web Token
}
