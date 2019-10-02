import { HttpProvider } from './../http/http'
import { Config } from './../../app/helpers/config'
import { Injectable } from '@angular/core'
import { ProviderBase } from '../../app/base/providerBase'
import { CategoryModel } from '../../app/models/Category'

@Injectable()
export class CategoryProvider extends ProviderBase<CategoryModel> {
  constructor(public http: HttpProvider) {
    super(`${Config.api}category`, http)
  }
}
