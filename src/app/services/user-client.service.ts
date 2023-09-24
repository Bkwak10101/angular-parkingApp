import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../model/user";
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  public addUser(user:User): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(user);
    console.log(body)
    return this.http.post(this.baseUrl, body,{'headers':headers})
  }

}
