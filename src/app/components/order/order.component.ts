import { Component, OnInit, Input } from '@angular/core';
import { Order } from '../../interfaces/interfaces';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {

  @Input() order: Order = {};

  constructor() { }

  ngOnInit() {}

}
