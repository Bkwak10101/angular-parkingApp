import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../model/user";
import {Vehicle} from "../model/vehicle";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  public addUser(user: User) {
    console.log(user)
    const headers = {'content-type': 'application/json'}
    return this.http.post<User>(this.baseUrl + "/user/signup", user, {'headers': headers})
  }

  public addVehicle(vehicle: Vehicle) {
    console.log(vehicle);
    const headers = {'content-type': 'application/json'}
    return this.http.post<Vehicle>(this.baseUrl + "/vehicle/createVehicle", vehicle, {'headers': headers})
  }

  public validateLogin(user: User) {
    const headers = {'content-type': 'application/json'}
    return this.http.post<User>(this.baseUrl + "/user/login", user, {'headers': headers})
  }

  //TODO: LOGIN:
  // Return JSON Web Token
}
