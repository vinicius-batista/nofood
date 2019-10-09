import { ProductProvider } from './../../providers/product/product'
import { ProductModel } from './../../app/models/Product'
import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'

/**
 * Generated class for the AdmProductsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-adm-products',
  templateUrl: 'adm-products.html',
})
export class AdmProductsPage {
  productsList: ProductModel[] = []

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private productProvider: ProductProvider
  ) {
    this.loadProducts()
  }

  ionViewDidEnter() {
    this.loadProducts()
  }

  loadProducts() {
    this.productProvider.get().then(result => {
      if (result.success) {
        this.productsList = result.data
      }
    })
  }

  addOrEdit(product?: ProductModel) {
    this.navCtrl.push('AdmProductPage', { product })
  }
}
