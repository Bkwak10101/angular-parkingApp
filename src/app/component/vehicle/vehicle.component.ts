import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MaterialModule} from "../../material.module";
import {CommonModule, NgIf} from "@angular/common";
import {Vehicle} from "../../model/vehicle";
import {UserService} from "../../services/user-client.service";

@Component({
  selector: 'app-vehicle',
  standalone: true,
  imports: [MaterialModule, NgIf, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {
  vehicleForm = this.fb.group({
    vehicleType: this.fb.control('', [Validators.required]),
    registrationNum: this.fb.control('', [Validators.required]),
  });

  constructor(private router: Router, private fb: FormBuilder, private userService: UserService) {
  }

  ngOnInit() {

  }

  addVehicle() {
    const vehicle: Vehicle = {
      vehicleType: this.vehicleForm.get('vehicleType')?.value,
      registrationNum: this.vehicleForm.get('registrationNum')?.value,
      user_id: 1
    };

    this.userService.addVehicle(vehicle).subscribe();

    // this.router.navigate(['/map']);
  }
}
