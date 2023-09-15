import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import { RouterModule, Routes } from '@angular/router'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginModule} from "./component/login/login.module";
import {LoginComponent} from "./component/login/login.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
]

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LoginModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent, LoginComponent]
})
export class AppModule {
}
