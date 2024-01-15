import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import * as turf from '@turf/turf';
import * as L from 'leaflet';
import {Spot} from '../model/spot';

@Injectable({
  providedIn: 'root'
})
export class MapClientService {
  data: any;
  mapInstance: L.Map | undefined;
  private _startMarker: any;
  parkingLayer: any[] = [];
  availableSpotIds: number[] = []
  private baseUrl = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) {
  }

  set startMarker(value: any) {
    this._startMarker = value;
  }

  get startMarker(): any {
    return this._startMarker;
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

//   findNearestParking() {
//     const startLatLng = this.startMarker.getLatLng();
//     let closestParking = {
//       layer: null,
//       distance: Infinity,
//     };
//
//     this.getAvailableSpots().subscribe(
//       (greenSpots) => {
//         this.availableSpotIds = greenSpots.map((spot: any) => spot.spot_id);
//         console.log(this.availableSpotIds)
//       },
//       (error) => {
//         console.error('Error fetching available spots:', error);
//       }
//     );
// this.parkingLayer.forEach(layer => {
//       // Parking 24  ->          leaflet_id = 46
//       // Parking obok placu ->   leaflet_id = 68
//       // Parking pod Wawelem ->  leaflet_id = 89
//
//       console.log(layer._leaflet_id)
//       const parkingCenter = layer.getBounds().getCenter();
//       const distance = turf.distance(
//         [startLatLng.lat, startLatLng.lng],
//         [parkingCenter.lat, parkingCenter.lng]);
//
//       if (distance < closestParking?.distance) {
//         closestParking = {
//           layer,
//           distance,
//         };
//       }
//     });
//
//     this.parkingLayer.forEach(layer => {
//       const parkingCenter = layer.getBounds().getCenter();
//       const distance = turf.distance(
//         [startLatLng.lat, startLatLng.lng],
//         [parkingCenter.lat, parkingCenter.lng]);
//
//       // Sprawdź czy znajdujesz się w odpowiednim przedziale dla danej warstwy parkingu
//       if ((layer._leaflet_id === 46 && this.availableSpotIds.some(id => id >= 1 && id <= 10)) ||
//         (layer._leaflet_id === 68 && this.availableSpotIds.some(id => id >= 11 && id <= 20)) ||
//         (layer._leaflet_id === 89 && this.availableSpotIds.some(id => id >= 21 && id <= 26))) {
//         if (layer._leaflet_id === 46 && this.availableSpotIds.some(id => id >= 1 && id <= 10)) {
//           if (distance < closestParking.distance) {
//             closestParking = {
//               layer,
//               distance,
//             };
//           }
//         }
//         if (layer._leaflet_id === 68 && this.availableSpotIds.some(id => id >= 11 && id <= 20)) {
//           if (distance < closestParking.distance) {
//             closestParking = {
//               layer,
//               distance,
//             };
//           }
//         }
//         if (layer._leaflet_id === 89 && this.availableSpotIds.some(id => id >= 21 && id <= 26)) {
//           if (distance < closestParking.distance) {
//             closestParking = {
//               layer,
//               distance,
//             };
//           }
//         }
//       }
//     });
//
//     const options: L.FitBoundsOptions = {
//       padding: [50, 50]
//     };
//
//     const bounds = closestParking.layer;
//
//     if (bounds) {
//       this.flyToPolygon(bounds, options)
//     }
//     return closestParking;
//   }


  findNearestParking() {

    console.log(this._startMarker);
    const startLatLng = this._startMarker.getLatLng();
    let closestParking = {
      layer: null,
      distance: Infinity,
    };

    this.getAvailableSpots().subscribe(
      (greenSpots) => {
        this.availableSpotIds = greenSpots.map((spot: any) => spot.spot_id);
        console.log(this.availableSpotIds)
      },
      (error) => {
        console.error('Error fetching available spots:', error);
      }
    );
    this.parkingLayer.forEach(layer => {

      console.log(layer._leaflet_id)
      const parkingCenter = layer.getBounds().getCenter();
      const distance = turf.distance(
        [startLatLng.lat, startLatLng.lng],
        [parkingCenter.lat, parkingCenter.lng]);

      if (distance < closestParking?.distance) {
        closestParking = {
          layer,
          distance,
        };
      }
    });

    const options: L.FitBoundsOptions = {
      padding: [50, 50]
    };

    const bounds = closestParking.layer;

    if (bounds) {
      this.flyToPolygon(bounds, options)
    }
    return closestParking;
  }

  private flyToPolygon(bounds: L.LatLngBounds, options: L.FitBoundsOptions) {
    if (this.mapInstance) {
      this.mapInstance.flyToBounds(bounds, options);
    } else {
      console.error('Map instance not available.');
    }
  }

  getAvailableSpots(): Observable<any[]> {
    const url = `${this.baseUrl}/spot/available`;
    return this.httpClient.get<any[]>(url);
  }

  fetchAndColorAvailableSpots(): void {
    this.getAvailableSpots().subscribe(
      (greenSpots) => {
        this.availableSpotIds = greenSpots.map((spot: any) => spot.spot_id);
        this.colorParkingSpots(greenSpots);
      },
      (error) => {
        console.error('Error fetching available spots:', error);
      }
    );
  }

  colorParkingSpots(greenSpots: Spot[]): void {
    this.parkingLayer.forEach(parking => {
      const spots = parking.getLayers();
      spots.forEach((spot: any) => {
        const matchingSpot = greenSpots.find(greenSpot => greenSpot.spot_id === spot.feature.properties.ID);
        if (matchingSpot) {
          this.colorSpot(spot);
        }
      });
    });
  }

  colorSpot(spot: any): void {
    const parkingName = encodeURIComponent(spot.feature.properties.Parking);

    spot.bindPopup(`
    <div class="popup">
      <div>Spot: ${spot.feature.properties.Spot}</div>
      <a class="custom-button"
        href="http://localhost:4200/reservation?parking=${parkingName}&spot=${spot.feature.properties.Spot}">
        Add reservation</a>
    </div>`);
    spot.setStyle({fillColor: 'green', color: 'green'});
  }

  colorUnavailableSpots() {
    this.parkingLayer.forEach(parking => {
      const spots = parking.getLayers();
      spots.forEach((spot: any) => {
        spot.setStyle({fillColor: 'red', color: 'red'});
      })
    });
  }
}
