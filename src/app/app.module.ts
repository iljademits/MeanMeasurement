import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MeasurementInputComponent } from './components/measurement-input/measurement-input.component';
import { MeasurementViewComponent } from './components/measurement-view/measurement-view.component';
import { HomeComponent } from './components/home/home.component';

import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { MeasurementsService } from './services/measurements.service';
import { ParametersService } from './services/parameters.service';

import { AuthGuard } from './guards/auth.guard';

let appRoutes: Routes = [
  { path: '',  component: HomeComponent},
  { path: 'register',  component: RegisterComponent},
  { path: 'login',  component: LoginComponent},
  { path: 'input-measurement',  component: MeasurementInputComponent, canActivate: [AuthGuard]},
  { path: 'view-measurement',  component: MeasurementViewComponent, canActivate: [AuthGuard]}
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    MeasurementInputComponent,
    MeasurementViewComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule,
    CommonModule,
    ChartsModule
  ],
  providers: [
    ValidateService,
    AuthService,
    MeasurementsService,
    ParametersService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
