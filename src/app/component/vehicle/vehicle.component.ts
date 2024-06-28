import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {UserService} from "../../services/user-client.service";
import {Vehicle} from "../../model/vehicle";
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardTitle
} from "@angular/material/card";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-vehicle',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatCardTitle,
    MatCardHeader,
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption,
    MatCardContent,
    MatCard,
    MatInput,
    MatButton
],
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css'],
  providers: [UserService]
})
export class VehicleComponent{
  newVehicle: Vehicle = {
    vehicle_id: 1,
    vehicleType: "",
    registrationNum: "",
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

  addVehicle() {
    this.newVehicle.vehicleType = this.vehicleForm.controls.vehicleType.value;
    this.newVehicle.registrationNum = this.vehicleForm.controls.registrationNum.value;

    this.userService.addVehicle(this.newVehicle).subscribe();

    this.router.navigate(['/profile']);
  }
}
