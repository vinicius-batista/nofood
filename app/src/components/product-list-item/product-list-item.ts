import { CartProvider } from './../../providers/cart/cart'
import { ProductModel } from './../../app/models/Product'
import { Component, Input, OnInit } from '@angular/core'
import { ModalController } from 'ionic-angular'

@Component({
  selector: 'ProductListItem',
  templateUrl: 'product-list-item.html',
})
export class ProductListItemComponent implements OnInit {
  @Input('product') product: ProductModel
  quantity: number

  constructor(
    public modalController: ModalController,
    public cartProvider: CartProvider
  ) {}

  ngOnInit() {
    if (this.product) {
      this.quantity = this.cartProvider.getProductQuantity(this.product)
    }
  }

  productDetails() {
    const { product } = this
    const modal = this.modalController.create('ProductDetailsPage', { product })

    modal.onDidDismiss((quantity: number) => {
      if (quantity) {
        this.quantity = quantity
      }
    })

    modal.present()
  }

  numberChanged(quantity: number) {
    const { product } = this
    this.cartProvider.changeCartItem({ product, quantity })
  }
}
