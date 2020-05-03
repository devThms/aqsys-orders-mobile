import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { User } from '../../interfaces/interfaces';

const path = environment.url;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  login( user: User ) {

    const url = path + '/v1/api/auth/login';

    return this.http.post(url, user);

  }

  register( user: User ) {

    const url = path + '/v1/api/auth/register';

    return this.http.post(url, user);

  }

  assignToken( id: string, token: string ) {

    const url = path + '/v1/api/users/' + id + '/assign-token';

    return this.http.put(url, token);

  }

}
