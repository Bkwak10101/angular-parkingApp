import {Component, OnInit} from '@angular/core';
import {MaterialModule} from "../../material.module";
import {CommonModule, NgIf} from "@angular/common";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AppComponent} from "../../app.component";
import {MatDatepickerModule} from "@angular/material/datepicker";

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [MaterialModule, NgIf, FormsModule, ReactiveFormsModule, CommonModule, MatDatepickerModule],
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

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
