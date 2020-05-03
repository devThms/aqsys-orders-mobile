import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { OrdersResp, OrderResp, Order } from '../../interfaces/interfaces';
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

    return this.http.get<OrdersResp>(url);

  }

  getOrder( id: string ) {

    // cambiar nombre url variable
    const url = URL + '/v1/api/orders/' + id;

    return this.http.get<OrderResp>(url);

  }

  updateOrder( order: Order ) {

    const url = URL + '/v1/api/orders/' + order.id;

    return this.http.put(url, order);

  }

  confirmOrder( order: Order ) {

    const url = URL + '/v1/api/orders/' + order.id + '/confirm';

    return this.http.put(url, order);

  }

  approveOrder( order: Order ) {

    const url = URL + '/v1/api/orders/' + order.id + '/approve';

    return this.http.put(url, order);

  }

  rejectOrder( order: Order ) {

    const url = URL + '/v1/api/orders/' + order.id + '/reject';

    return this.http.put(url, order);

  }
}
