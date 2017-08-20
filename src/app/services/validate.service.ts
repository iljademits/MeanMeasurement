import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }

  validateRequiredFields(user) {
    return (user.name !== undefined && user.username !== undefined && user.password !== undefined && user.passwordCtrl !== undefined);
  }

  validatePassword(user) {
    return (user.password === user.passwordCtrl);
  }
}
