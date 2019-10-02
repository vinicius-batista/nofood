import { CartProvider } from './../../providers/cart/cart'
import { ProductModel } from './../../app/models/Product'
import { Component } from '@angular/core'
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController,
} from 'ionic-angular'

@IonicPage()
@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html',
})
export class ProductDetailsPage {
  product: ProductModel

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public cartProvider: CartProvider
  ) {
    this.product = this.navParams.get('product')
  }

  goBack() {
    this.viewCtrl.dismiss()
  }

  addToCart() {
    const quantity = this.cartProvider.getProductQuantity(this.product)

    this.cartProvider.changeCartItem({
      product: this.product,
      quantity: quantity + 1,
    })

    this.viewCtrl.dismiss(quantity + 1)
  }
}
