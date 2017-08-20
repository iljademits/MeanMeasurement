import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { FlashMessagesService } from 'angular2-flash-messages';
import { MeasurementsService } from '../../services/measurements.service';
import { ParametersService } from '../../services/parameters.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-measurement-input',
  templateUrl: './measurement-input.component.html',
  styleUrls: ['./measurement-input.component.css']
})
export class MeasurementInputComponent implements OnInit {
  parameters:[Object];
  parameterCode:String;
  parameterValue:Number;

  constructor(
    private authService: AuthService,
    private measurementsService: MeasurementsService,
    private parametersService: ParametersService,
    private router: Router,
    private flashMessages: FlashMessagesService,
    private common: CommonModule,
    private browser: BrowserModule) { }

  ngOnInit() {
    this.parametersService.getParameters().subscribe(response => {
      this.parameters = response.parameters;
    },
    err => {
      console.log(err);
      return false;
    });
  }

  onFormSubmit() {
    let measurement = {
      code: this.parameterCode,
      value: this.parameterValue,
      created: new Date()
    }

    this.measurementsService.saveMeasurement(measurement).subscribe(data => {

      if(data.success) {
        this.flashMessages.show(data.msg, {cssClass: 'alert-success', timeout: 3000});
      } else {
        this.flashMessages.show(data.msg, {cssClass: 'alert-danger', timeout: 3000});
      }
      this.router.navigate(['/input-measurement']);
    });
  }
}
