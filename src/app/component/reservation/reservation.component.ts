import {Component, OnInit} from '@angular/core';
import {CommonModule, NgIf} from "@angular/common";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {VehicleService} from "../../services/vehicle.service";
import {NavbarService} from "../../services/navbar.service";
import {Parking} from "../../model/parking";
import {ParkingService} from "../../services/parking.service";
import {switchMap} from "rxjs";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatFormField, MatFormFieldModule, MatHint, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {ReservationService} from "../../services/reservation.service";
import {MapClientService} from "../../services/map-client.service";
import {Vehicle} from "../../model/vehicle";
import {Spot} from "../../model/spot";
import {Reservation} from "../../model/reservation";
import {provideNativeDateAdapter} from "@angular/material/core";
import {MatDatepickerModule} from "@angular/material/datepicker";

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
    MatCardHeader,
    MatCardContent,
    MatCard,
    MatCardTitle,
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption,
    MatButton,
    MatInput,
    MatHint,
    MatDatepickerModule,
    MatFormFieldModule
  ],
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css'],
  providers: [ReservationService,
    VehicleService,
    NavbarService,
    ParkingService,
    MapClientService,
    provideNativeDateAdapter()
  ]
})
export class ReservationComponent implements OnInit {

  vehicles: Vehicle[] = [];
  spots: Spot[] = [];

  // parking
  parking: Parking = {
    parking_id: 1,
    name: "",
    address: ""
  }

  // spot
  spot: Spot = {
    availability: true,
    parking: this.parking,
    spot_id: 1,
    spotNumber: 1
  }

  // vehicle
  vehicle: Vehicle = {
    vehicle_id: 1,
    vehicleType: "Car",
    registrationNum: "KR 854192",
    user_id: 1
  }

  newReservation: Reservation = {
    spots: this.spots,
    vehicle_id: this.vehicle,
    startDate: "",
    endDate: ""
  }

  constructor(private route: ActivatedRoute, private router: Router, private navbarService: NavbarService,
              private reservationService: ReservationService, private vehicleService: VehicleService,
              private parkingService: ParkingService, private mapService: MapClientService) {
  }

  public reservationForm = new FormGroup({
    vehicle: new FormControl('', {
      validators: [Validators.required], nonNullable: true
    }),
    parking: new FormControl('', {
      validators: [Validators.required], nonNullable: true
    }),
    spot: new FormControl('', {
      validators: [Validators.required], nonNullable: true
    }),
    startDate: new FormControl('', {
      validators: [Validators.required], nonNullable: true
    }),
    endDate: new FormControl('', {
      validators: [Validators.required], nonNullable: true
    })
  })

  ngOnInit() {
    this.loadVehicles();
    this.route.queryParams.subscribe(params => {
      const parking = params['parking'];
      const spot = params['spot'];
      if (parking && spot) {
        this.reservationForm.patchValue({parking, spot});
      }
    });
  }

  loadVehicles() {
    this.vehicleService.getAllVehicles()
      .subscribe((vehicles: Vehicle[]) => {
        this.vehicles = vehicles;
      });
  }

  addReservation() {
    const registrationNum = this.reservationForm.controls.vehicle.value;
    const parkingName = this.reservationForm.controls.parking.value;
    const spotNum = this.reservationForm.controls.spot.value;

    this.parkingService.getParkingByName(parkingName).pipe(
      switchMap((parking: Parking) => {
        return this.parkingService.getSpotByParkingIdAndSpotNumber(parking.parking_id, spotNum);
      }),
      switchMap((spot: Spot) => {
        this.newReservation.spots.push(spot);
        return this.vehicleService.getVehicleByRegistrationNum(registrationNum);
      })
    ).subscribe((vehicle: Vehicle) => {
      this.newReservation.vehicle_id = vehicle;
      this.newReservation.startDate = this.reservationForm.controls.startDate.value;
      this.newReservation.endDate = this.reservationForm.controls.endDate.value;
      this.reservationService.addReservation(this.newReservation).subscribe(() => {
        this.mapService.fetchAndColorAvailableSpots();
        this.mapService.colorUnavailableSpots();
      });
    });
    this.router.navigate(['/map']);
  }
}
