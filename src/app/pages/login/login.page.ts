import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { User } from '../../interfaces/interfaces';

import { FCM } from '@ionic-native/fcm/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user: User = {};
  token: string;
  deviceToken: string;

  constructor(
    private authService: AuthService,
    private fcm: FCM,
    private router: Router
  ) { }

  ngOnInit() {
    this.fcm.getToken().then((dt) => {
      this.deviceToken = dt;
    });
  }

  login( user: User ) {

    this.authService.login( user )
                    .subscribe( (resp: any) => {
                      this.user.id = resp.payload.id;
                      this.user.userName = resp.payload.username;
                      this.token = resp.token;
                      this.authService.assignToken(this.user.id, this.deviceToken);
                      console.table(this.user, this.token, this.deviceToken);
                      this.router.navigate(['/tabs/tab1']);
                    });
  }


}
