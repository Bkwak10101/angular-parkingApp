import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MapClientService {

  mapInstance: L.Map | undefined;
  startMarker: any;
  parkingLayer: any;
  parking: any;

  constructor(private httpClient: HttpClient) {
  }

  setStartMarker(marker: any) {
    this.startMarker = marker;
  }

  setParkingLayer(layer: any) {
    this.parkingLayer = layer;
  }

  setParking(parking: any) {
    this.parking = parking;
  }

  setMapInstance(map: L.Map) {
    this.mapInstance = map;
  }

  public getMapData(): Observable<any> {
    const url = 'assets/data/map.geojson';
    return this.httpClient.get(url);
  }

//TODO: Implement distance check
  findNearestPolygon() {
    console.log(this.parking)

    if (this.mapInstance && this.parkingLayer) {
      const bounds = this.parkingLayer.getBounds();
      const options: L.FitBoundsOptions = {
        padding: [50, 50]
      };
      this.flyToPolygon(bounds, options);
    }
  }

  private flyToPolygon(bounds: L.LatLngBounds, options: L.FitBoundsOptions) {
    if (this.mapInstance) {
      this.mapInstance.flyToBounds(bounds, options);
    } else {
      console.error('Map instance not available.');
    }
  }
}
