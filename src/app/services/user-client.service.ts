import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../model/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  public addUser(user: User) {
    const headers = {'content-type': 'application/json'}
    return this.http.post<any>(this.baseUrl + "/api/signup", user, {'headers': headers})
  }

  public validateLogin(user: User) {
    const headers = {'content-type': 'application/json'}
    return this.http.post<any>(this.baseUrl + "/api/login", user, {'headers': headers})
  }


  //TODO: LOGIN:
  // Return JSON Web Token
}
