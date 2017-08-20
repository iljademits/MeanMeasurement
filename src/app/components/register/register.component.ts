import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FlashMessagesService } from 'angular2-flash-messages';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  password: String;
  passwordCtrl: String;

  constructor(
    private router: Router,
    private validateService: ValidateService,
    private authService: AuthService,
    private flashMessages: FlashMessagesService) { }

  ngOnInit() {
  }

  onRegisterSubmit() {
    let user = {
      name: this.name,
      username: this.username,
      password: this.password,
      passwordCtrl: this.passwordCtrl
    }

    // Validate required fields
    if(!this.validateService.validateRequiredFields(user)) {
      this.flashMessages.show('Please fill in all required fields', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    // Validate password
    if(!this.validateService.validatePassword(user)) {
      this.flashMessages.show('Password does not match control field', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    // Register user
    this.authService.registerUser(user).subscribe(data => {
      if(data.success) {
        this.flashMessages.show('You have now successfully registered', { cssClass: 'alert-success', timeout: 3000 });
        this.router.navigate(['/login']);
      } else {
        this.flashMessages.show('Something went wrong. Please try again!', { cssClass: 'alert-danger', timeout: 3000 });
        this.router.navigate(['/register']);
      }
    })
  }

}
