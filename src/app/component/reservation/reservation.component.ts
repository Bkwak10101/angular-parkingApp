import {Component, OnInit} from '@angular/core';
import {MaterialModule} from "../../material.module";
import {CommonModule, NgIf} from "@angular/common";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AppComponent} from "../../app.component";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {Vehicle} from "../../model/vehicle";
import {Reservation} from "../../model/reservation";
import {Spot} from "../../model/spot";
import {Parking} from "../../model/parking";

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
    vehicle : this.newVehicle,
    spot : this.newSpot,
    dateStart: "",
    dateEnd : ""
  }

  constructor(private router: Router, private fb: FormBuilder, private appComponent: AppComponent) {
  }

  reservationForm = this.fb.group({
    vehicle: this.fb.control('', [Validators.required]),
    parking: this.fb.control('', [Validators.required]),
    spot: this.fb.control('', [Validators.required,
      Validators.minLength(1)]),
    startDate: this.fb.control('', [Validators.required]),
    endDate: this.fb.control('', [Validators.required]),
    startTime: this.fb.control('', [Validators.required]),
    endTime: this.fb.control('', [Validators.required]),
  });

  ngOnInit() {

  }

  addReservation() {
    this.router.navigate(['/map']);
  }
}
