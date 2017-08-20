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
  selector: 'app-measurement-view',
  templateUrl: './measurement-view.component.html',
  styleUrls: ['./measurement-view.component.css']
})
export class MeasurementViewComponent implements OnInit {
  parameters:[Object];
  parameterCode:String;
  measurements:Array<any>;

  constructor(
    private parametersService: ParametersService,
    private measurementsService: MeasurementsService,
    private flashMessages: FlashMessagesService,
    private router: Router) { }

  ngOnInit() {
    this.parametersService.getParameters().subscribe(response => {
      this.parameters = response.parameters;
    },
    err => {
      console.log(err);
      return false;
    });
  }

  // lineChart
  public lineChartData:Array<any> = [
    {data: [], label: ''}
  ];
  public lineChartLabels:Array<string> = [];
  public lineChartOptions:any = {
    responsive: true
  };
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];

  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';

  setLineChartValues() {
    let _lineChartData:Array<any> = new Array();
    let _lineChartLabels:Array<any> = new Array();
    _lineChartData[0] = {data: new Array(this.measurements.length), label: this.measurements[0].code};
    for (var i = 0; i < this.measurements.length; i++) {
      _lineChartData[0].data[i] = this.measurements[i].value;
      _lineChartLabels[i] = new Date(this.measurements[i].created).toUTCString();
    }
    this.lineChartLabels =_lineChartLabels;
    this.lineChartData = _lineChartData;
  }

  clearChart() {
    this.lineChartLabels = [];
  }

  onRefresh() {
    let code = {
      code:  this.parameterCode
    }
    this.measurementsService.fetchMeasurementsByParameterCode(code).subscribe(response => {
      this.measurements = response.measurements;
      this.setLineChartValues();
      this.router.navigate(['/view-measurement']);
    });
  }
}
