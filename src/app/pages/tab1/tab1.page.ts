import { Component, OnInit } from '@angular/core';

import { OrderService } from '../../services/orders/order.service';
import { Order } from '../../interfaces/interfaces';
import { FCM } from '@ionic-native/fcm/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  orders: Order[] = [];

  constructor(
    private orderService: OrderService,
    private fcm: FCM
  ) {}

  ngOnInit() {
    this.getOrders();

    this.fcm.onNotification().subscribe((data) => {
      if (data.wasTapped) {
        console.log('Received in background', data);
      } else {
        console.log('Received in foreground', data);
      }
    });
  }

  // ionViewWillEnter() {
  //   console.log('ionViewWillEnter entered');
  //   this.getOrders();
  // }

  // ionViewDidEnter() {
  //   console.log('ionViewDidEnter entered');
  // }

  refresher( event ) {
    this.getOrders( event );
  }

  getOrders( event? ) {
    this.orderService.getOrders()
                      .subscribe( resp => {
                        this.orders = resp.orders;
                        if (event) {
                          event.target.complete();
                        }
                        console.log(this.orders);
                      });
  }

}
