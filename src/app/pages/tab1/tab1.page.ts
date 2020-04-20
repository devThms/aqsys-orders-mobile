import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/orders/order.service';
import { Order } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  orders: Order[] = [];

  constructor(
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.orderService.getOrders()
                      .subscribe( resp => {
                        console.log(resp.orders);
                        this.orders = resp.orders;
                      });
  }

}
