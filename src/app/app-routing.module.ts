import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignupComponent} from "./component/signup/signup.component";
import {LoginComponent} from "./component/login/login.component";
import {MapComponent} from "./component/map/map.component";
import {ReservationComponent} from "./component/reservation/reservation.component";
import {VehicleComponent} from "./component/vehicle/vehicle.component";

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'map', component: MapComponent},
  {path: 'reservation', component: ReservationComponent},
  {path: 'vehicle', component: VehicleComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
