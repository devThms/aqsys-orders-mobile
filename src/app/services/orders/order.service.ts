import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { Orders } from '../../interfaces/interfaces';
const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private http: HttpClient
  ) { }

  getOrders() {

    const url = URL + '/v1/api/orders';

    return this.http.get<Orders>(url);

  }
}
