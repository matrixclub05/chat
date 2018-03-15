import {Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import {LoginService} from "../login/login.service";

@Injectable()
export class LoginGuardService implements CanActivate {

  constructor(private router: Router, private loginService: LoginService) {
  }

  canActivate() {
    if (this.loginService.isConnected()) {
      return true;
    }

    this.router.navigate(['/']);
    return false;
  }

}
