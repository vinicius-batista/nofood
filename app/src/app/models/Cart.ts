import { CartItemModel } from './CartItem'
export class CartModel {
  _id: string
  userId: string
  createdAt: Date
  totalValue: number = 0
  items: CartItemModel[] = []
}
