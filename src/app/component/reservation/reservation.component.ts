import {Component, OnInit} from '@angular/core';
import {MaterialModule} from "../../material.module";
import {CommonModule, NgIf} from "@angular/common";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {Vehicle} from "../../model/vehicle";
import {Reservation} from "../../model/reservation";
import {Spot} from "../../model/spot";
import {Parking} from "../../model/parking";
import {ReservationService} from "../../services/reservation.service";
import {VehicleService} from "../../services/vehicle.service";
import {NavbarService} from "../../services/navbar.service";

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [MaterialModule, NgIf, FormsModule, ReactiveFormsModule, CommonModule, MatDatepickerModule],
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit, Vehicle, Parking, Spot {

  registrationNum: any;
  user_id: number = 1;
  vehicleType: string = "";

  // parking
  name: string = "";
  address: string = "";

  // spot
  parking_id: number = 0;
  spotNumber: number = 0;
  availability: boolean = true;

  newReservation: Reservation = {
    vehicle: {} as Vehicle,
    spot_id: 0,
    startDate: "",
    endDate: ""
    // startTime: "",
// endTime: ""
  }

  constructor(private router: Router, private navbarService: NavbarService,
              private reservationService: ReservationService, private vehicleService: VehicleService) {
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
    // }),
    // startTime: new FormControl('', {
    //   validators: [Validators.required], nonNullable: true
    // }),
    // endTime: new FormControl('', {
    //   validators: [Validators.required], nonNullable: true
    // })
  })


  ngOnInit() {
  }


  //TODO: Fix Vehicle and Spot data models
  addReservation() {
    const vehicleId = this.reservationForm.controls.vehicle.value;

    this.vehicleService.getVehicleById(Number(vehicleId))
      .subscribe((vehicle: Vehicle) => {
        this.newReservation.vehicle = vehicle;

        // this.newReservation.vehicle_id = Number(this.reservationForm.controls.vehicle_id.value);
        this.newReservation.spot_id = Number(this.reservationForm.controls.spot.value);
        this.newReservation.startDate = this.reservationForm.controls.startDate.value;
        this.newReservation.endDate = this.reservationForm.controls.endDate.value;
        // this.newReservation.startTime = this.reservationForm.controls.startTime.value;
        // this.newReservation.endTime = this.reservationForm.controls.endTime.value;

        console.log(this.newReservation)
      });
    this.reservationService.addReservation(this.newReservation).subscribe();
// }
//     this.router.navigate(['/map']);

  }
}
