import { UserProvider } from './../user/user'
import { Config } from './../../app/helpers/config'
import { HttpProvider } from './../http/http'
import { ProductModel } from './../../app/models/Product'
import { CartItemModel } from './../../app/models/CartItem'
import { CartModel } from './../../app/models/Cart'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'

@Injectable()
export class CartProvider {
  private _cart: CartModel = new CartModel()
  cart$: Observable<CartModel>
  cartObservable: any

  constructor(public http: HttpProvider, public userProvider: UserProvider) {
    this.cart$ = Observable.create(obj => {
      this.cartObservable = obj
      this.cartObservable.next(this._cart)
    })
  }

  private addOrRemoveProduct(item: CartItemModel) {
    const cartItemIndex = this._cart.items.findIndex(value => {
      return value.product._id === item.product._id
    })

    if (cartItemIndex === -1) {
      this._cart.items.push(item)
      return
    }

    if (item.quantity === 0) {
      this._cart.items.splice(cartItemIndex, 1)
      return
    }

    this._cart.items[cartItemIndex] = item
  }

  changeCartItem(item: CartItemModel) {
    this.addOrRemoveProduct(item)

    this._cart.totalValue = this._cart.items.reduce((acc, item) => {
      return acc + item.product.price * item.quantity
    }, 0)
    this.cartObservable.next(this._cart)
  }

  getProductQuantity(product: ProductModel) {
    const cartItem = this._cart.items.find(
      item => item.product._id === product._id
    )

    if (!cartItem) {
      return 0
    }

    return cartItem.quantity
  }

  saveOrder() {
    this._cart.userId = this.userProvider.getLoggedUser()._id

    return this.http.post(`${Config.api}order`, this._cart).then(result => {
      this._cart = new CartModel()
      return result
    })
  }

  getOrders() {
    return this.http.get(`${Config.api}order`)
  }
}
