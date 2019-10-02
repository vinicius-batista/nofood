import { CartModel } from './../../app/models/Cart'
import { CartProvider } from './../../providers/cart/cart'
import { ProductModel } from './../../app/models/Product'
import { ProductProvider } from './../../providers/product/product'
import { CategoryModel } from './../../app/models/Category'
import { Component } from '@angular/core'
import {
  IonicPage,
  NavController,
  NavParams,
  ModalController,
} from 'ionic-angular'

@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage {
  selectedCategory: CategoryModel
  products: ProductModel[]
  cart: CartModel = new CartModel()

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public productProvider: ProductProvider,
    public modalController: ModalController,
    public cartProvider: CartProvider
  ) {
    this.selectedCategory = JSON.parse(localStorage.getItem('nofood.category'))
  }

  ionViewDidEnter() {
    this.cartProvider.cart.subscribe(data => {
      this.cart = data
    })
    this.selectedCategory = JSON.parse(localStorage.getItem('nofood.category'))
    this.loadData()
  }

  loadData() {
    this.productProvider
      .getByCategoryid(this.selectedCategory._id)
      .then(result => {
        if (result.success) {
          this.products = result.data
        }
      })
  }

  goToCart() {
    this.navCtrl.push('CartPage', {})
  }
}
