import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class MapClientService {

    mapInstance: L.Map | undefined;
    startMarker: any;
    parkingLayer: any[] = [];

    constructor(private httpClient: HttpClient) {
    }

    setStartMarker(marker: any) {
        this.startMarker = marker;
    }

    setParkingLayer(layer: any) {
        this.parkingLayer = layer;
    }


    setMapInstance(map: L.Map) {
        this.mapInstance = map;
    }

    public getMapData(url: string): Observable<any> {
        return this.httpClient.get(url);
    }

//TODO: Implement distance check
    findNearestPolygon() {

        if (this.mapInstance && this.startMarker && this.parkingLayer.length >= 2) {
            const startLatLng = this.startMarker.getLatLng();
            let minDistance = Infinity;
            let nearestParkingBounds = this.parkingLayer[0].getBounds();

            for (let i = 1; i < this.parkingLayer.length; i++) {
                const parkingBounds = this.parkingLayer[i].getBounds();
                const center = parkingBounds.getCenter();
                const distance = startLatLng.distanceTo(center);

                if (distance < minDistance) {
                    minDistance = distance;
                    nearestParkingBounds = parkingBounds;
                }
            }

            const options: L.FitBoundsOptions = {
                padding: [50, 50]
            };

            this.flyToPolygon(nearestParkingBounds, options);
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
