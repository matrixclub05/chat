import {Component, OnInit} from '@angular/core';
import {LoginService} from "./login.service";
import {Router} from "@angular/router";
import {User} from "../model/user";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading: boolean;
  user: User;
  constructor(private router: Router,
              private loginService: LoginService) {
    this.user = new User();
  }

  ngOnInit() {
  }

  login() {
    this.loading = true;

    this.loginService.login(this.user)
      .then(result => {
        this.router.navigate(['/home']);
        this.loading = false;
      });
  }

}
