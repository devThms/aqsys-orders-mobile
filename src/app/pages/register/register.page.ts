import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

import { User } from '../../interfaces/interfaces';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  user: User = {};

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  register( user: User ) {

    this.authService.register( user )
                    .subscribe( (resp: any) => {
                      this.user.id = resp.User.id;
                      this.user.userName = resp.User.userName;
                      this.user.role = resp.User.role.name;
                      console.log(this.user);
                    });

  }

}
