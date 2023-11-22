import {Component, OnInit} from '@angular/core';
import {MaterialModule} from "../../material.module";
import {CommonModule, NgIf} from "@angular/common";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AppComponent} from "../../app.component";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {Vehicle} from "../../model/vehicle";
import {Reservation} from "../../model/reservation";
import {Spot} from "../../model/spot";
import {Parking} from "../../model/parking";
import {ReservationService} from "../../services/reservation.service";

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [MaterialModule, NgIf, FormsModule, ReactiveFormsModule, CommonModule, MatDatepickerModule],
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  newVehicle: Vehicle = {
    vehicleType: "",
    registrationNum: null,
    user_id: 1
  }

  newParking: Parking = {
    name: "",
    address: ""
  }

  newSpot: Spot = {
    parking: this.newParking,
    spotNumber: 0,
    availability: true
  }

  newReservation: Reservation = {
    vehicle: this.newVehicle,
    spot: this.newSpot,
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: ""
  }

  constructor(private router: Router, private appComponent: AppComponent,
              private reservationService: ReservationService) {
  }

  public reservationForm = new FormGroup({
    vehicle: new FormControl('', {
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
    }),
    startTime: new FormControl('', {
      validators: [Validators.required], nonNullable: true
    }),
    endTime: new FormControl('', {
      validators: [Validators.required], nonNullable: true
    })
  })


  ngOnInit() {

  }


  //TODO: Fix Vehicle and Spot data models
  addReservation() {
    this.newReservation.vehicle = this.reservationForm.controls.vehicle.value as unknown as Vehicle;
    this.newReservation.spot = this.reservationForm.controls.spot.value as unknown as Spot;
    this.newReservation.startDate = this.reservationForm.controls.vehicle.value;
    this.newReservation.endDate = this.reservationForm.controls.vehicle.value;
    this.newReservation.startTime = this.reservationForm.controls.vehicle.value;
    this.newReservation.endTime = this.reservationForm.controls.vehicle.value;

    console.log(this.newReservation)

    this.reservationService.addReservation(this.newReservation).subscribe();
    this.router.navigate(['/map']);
  }
}
