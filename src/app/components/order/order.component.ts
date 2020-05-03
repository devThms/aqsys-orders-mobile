import { Component, OnInit, Input } from '@angular/core';
import { Order } from '../../interfaces/interfaces';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { OrderService } from '../../services/orders/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {

  @Input() order: Order = {};

  colorType: string;

  constructor(
    private router: Router,
    private alertCtrl: AlertController,
    private orderService: OrderService
  ) { }

  ngOnInit() {
    if (this.order.status === 'ACTIVE') {
      this.colorType = 'order-active';
    } else {
      this.colorType = 'order-confirmed';
    }
  }

  goDetail( id: string ) {
    this.router.navigate(['order', id]);
  }

  async presentAlertSuccess() {
    const alert = await this.alertCtrl.create({
      header: 'Exitoso',
      message: 'La orden fue procesada con éxito',
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentAlertError() {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message: 'Hubo un error en la petición realizada',
      buttons: ['OK']
    });

    await alert.present();
  }

  async alertConfirmReject() {
    const alert = await this.alertCtrl.create({
      header: 'Info!',
      message: 'Accion cancelada por el usuario',
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentAlertApprove(order: Order) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar!',
      message: '<strong>¿Desea confirmar la orden de servicio</strong>?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            this.alertConfirmReject();
          }
        }, {
          text: 'OK',
          handler: () => {
            this.approveOrder(order);
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlertReject(order: Order) {
    const alert = await this.alertCtrl.create({
      header: 'Rechazar!',
      message: '<strong>¿Desea rechazar la orden de servicio</strong>?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            this.alertConfirmReject();
          }
        }, {
          text: 'OK',
          handler: () => {
            this.rejectOrder(order);
          }
        }
      ]
    });

    await alert.present();
  }

  approveOrder( order: Order ) {

    this.orderService.approveOrder(order)
                      .subscribe( (resp: any) => {
                        if ( resp.message === 'OK' ) {
                          this.presentAlertSuccess();
                        } else {
                          this.presentAlertError();
                        }
                      });
  }

  rejectOrder( order: Order ) {

    this.orderService.rejectOrder(order)
                      .subscribe( (resp: any) => {
                        if ( resp.message === 'OK' ) {
                          this.presentAlertSuccess();
                        } else {
                          this.presentAlertError();
                        }
                      });
  }
}
