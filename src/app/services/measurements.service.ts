import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { AuthService } from '../services/auth.service';

@Injectable()
export class MeasurementsService {

  constructor(
    private authService: AuthService,
    private http: Http) { }

  saveMeasurement(measurement) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/measurements/input', measurement, {headers: headers})
    .map(res => res.json());
  }

  fetchMeasurementsByParameterCode(parameterCode) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/measurements/fetch', parameterCode, {headers: headers})
    .map(res => res.json());
  }

}
