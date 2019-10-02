import { CartModel } from './../../app/models/Cart'
import { CartProvider } from './../../providers/cart/cart'
import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'

@IonicPage()
@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html',
})
export class OrdersPage {
  orders: CartModel[] = []

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public cartProvider: CartProvider
  ) {}

  ionViewDidLoad() {
    this.getOrders()
  }

  getOrders() {
    this.cartProvider.getOrders().then(result => {
      if (result.success) {
        this.orders = result.data
      }
    })
  }
}
