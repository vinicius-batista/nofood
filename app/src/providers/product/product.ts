import { HttpProvider } from './../http/http'
import { Config } from './../../app/helpers/config'
import { Injectable } from '@angular/core'
import { ProviderBase } from '../../app/base/providerBase'
import { ProductModel } from '../../app/models/Product'

@Injectable()
export class ProductProvider extends ProviderBase<ProductModel> {
  url = `${Config.api}product`

  constructor(public http: HttpProvider) {
    super(`${Config.api}product`, http)
  }

  getByCategoryid(categoryId: string) {
    return this.http.get(`${this.url}/category/${categoryId}`)
  }
}
