import { AlertProvider } from './../../providers/alert/alert'
import { CartModel } from './../../app/models/Cart'
import { CartProvider } from './../../providers/cart/cart'
import { Component } from '@angular/core'
import {
  IonicPage,
  NavController,
  NavParams,
  ModalController,
} from 'ionic-angular'
import { Observable } from 'rxjs/Observable'

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {
  cart$: Observable<CartModel>

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalController: ModalController,
    public cartProvider: CartProvider,
    public alertProvider: AlertProvider
  ) {
    this.cart$ = this.cartProvider.cart$
  }

  saveOrder() {
    this.cartProvider.saveOrder().then(result => {
      if (result.success) {
        this.navCtrl.setRoot('OrdersPage')
        this.alertProvider.toast('Pedido finalizado com sucesso', 'bottom')
      }
    })
  }
}
