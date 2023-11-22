import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MaterialModule} from "../../material.module";
import {CommonModule, NgIf} from "@angular/common";
import {UserService} from "../../services/user-client.service";
import {Vehicle} from "../../model/vehicle";

@Component({
  selector: 'app-vehicle',
  standalone: true,
  imports: [MaterialModule, NgIf, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {
  newVehicle: Vehicle = {
    vehicleType: "",
    registrationNum: null,
    user_id: 1
  }

  public vehicleForm = new FormGroup({
    vehicleType: new FormControl('', {
      validators: [Validators.required], nonNullable: true
    }),
    registrationNum: new FormControl('', {
      validators: [Validators.required], nonNullable: true
    }),
  });

  constructor(private router: Router, private userService: UserService) {
  }

  ngOnInit() {

  }

  addVehicle() {

    this.newVehicle.vehicleType = this.vehicleForm.controls.vehicleType.value;
    this.newVehicle.registrationNum = this.vehicleForm.controls.registrationNum.value;

    this.userService.addVehicle(this.newVehicle).subscribe();

    this.router.navigate(['/map']);
  }
}
