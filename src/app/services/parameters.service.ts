import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { AuthService } from '../services/auth.service';

@Injectable()
export class ParametersService {

  constructor(
    private authService: AuthService,
    private http: Http) { }

    getParameters() {
      let headers = new Headers();
      this.authService.loadToken();
      headers.append('Authorization', this.authService.authToken);
      headers.append('Content-Type', 'application/json');
      return this.http.get('http://localhost:3000/parameters/fetchAll', {headers: headers})
      .map(res => res.json());
    }

}
