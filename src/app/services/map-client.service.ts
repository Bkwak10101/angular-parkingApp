import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MapClientService {

  constructor(private httpClient: HttpClient) {
  }

  public getMapData(): Observable<any> {
    const url = 'assets/data/map.geojson';
    return this.httpClient.get(url);
  }


}
