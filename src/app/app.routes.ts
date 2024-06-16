import {Routes} from '@angular/router';
import {ReservationComponent} from "./component/reservation/reservation.component";
import {MapComponent} from "./component/map/map.component";
import {VehicleComponent} from "./component/vehicle/vehicle.component";
import {SignupComponent} from "./component/signup/signup.component";
import {LoginComponent} from "./component/login/login.component";
import {ProfileComponent} from "./component/profile/profile.component";

export class RouteData {
  menuButtonVisible: boolean;

  constructor(menuButtonVisible: boolean) {
    this.menuButtonVisible = menuButtonVisible;
  }
}

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'map',
    component: MapComponent
  },
  {
    path: 'reservation',
    component: ReservationComponent
  },
  {
    path: 'vehicle',
    component: VehicleComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
];
