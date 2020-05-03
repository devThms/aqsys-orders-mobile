import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order, BussinessPartner } from '../../interfaces/interfaces';
import { OrderService } from '../../services/orders/order.service';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {

  id: string;
  orderId: string;
  order: Order = {};
  customerBp: BussinessPartner = {};
  technicalBp: BussinessPartner = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService,
    public alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getOrder( this.id );
  }

  async presentAlertSuccess() {
    const alert = await this.alertCtrl.create({
      header: 'Exitoso',
      message: 'La orden fue procesada con éxito',
      buttons: ['OK']
    });

    await alert.present();
    this.router.navigate(['/tabs/tab1']);
  }

  async presentAlertError() {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message: 'Hubo un error en la petición realizada',
      buttons: ['OK']
    });

    await alert.present();
  }


  getOrder( id: string ) {

    this.orderService.getOrder(id)
                      .subscribe( resp => {
                        this.order = resp.order;
                        this.orderId = this.order.id.substring(24);
                        this.customerBp = resp.order.customer.bussinessPartner;
                        this.technicalBp = resp.order.technical.bussinessPartner;
                      });
  }

  updateOrder( order: Order ) {

    this.orderService.updateOrder(order)
                      .subscribe( (resp: any) => {
                        if ( resp.message === 'OK' ) {
                          this.confirmOrder(order);
                          this.presentAlertSuccess();
                          this.order = resp.orderUpdated;
                        } else {
                          this.presentAlertError();
                        }

                      });
  }

  confirmOrder( order: Order ) {

    this.orderService.confirmOrder(order)
                      .subscribe( (resp: any) => {
                        if ( resp.message === 'OK' ) {
                          console.log('Orden Confirmada');
                        } else {
                          console.log('Ocurrio un error en la confirmación de la orden');
                        }
                      });
  }

}
