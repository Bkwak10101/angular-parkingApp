import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
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

  vehicleForm = this.fb.group({
    vehicleType: this.fb.control('', [Validators.required]),
    registrationNum: this.fb.control('', [Validators.required]),
  });

  constructor(private router: Router, private fb: FormBuilder, private userService: UserService) {
  }

  ngOnInit() {

  }

  addVehicle() {

    this.newVehicle.vehicleType = this.vehicleForm.get('vehicleType')?.value as string;
    this.newVehicle.registrationNum = this.vehicleForm.get('vehicleType')?.value;

    this.userService.addVehicle(this.newVehicle).subscribe();

    // this.router.navigate(['/map']);
  }
}
