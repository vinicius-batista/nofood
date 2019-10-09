import { Config } from './../../app/helpers/config'
import { HttpProvider } from './../http/http'
import { UserModel } from './../../app/models/User'
import { Injectable } from '@angular/core'
import { ProviderBase } from '../../app/base/providerBase'

@Injectable()
export class UserProvider extends ProviderBase<UserModel> {
  url = `${Config.api}user`

  constructor(public http: HttpProvider) {
    super(`${Config.api}user`, http)
  }

  authenticate(email: string, password: string) {
    return this.http.post(`${this.url}/authenticate`, { email, password })
  }

  signUp(user: UserModel) {
    return this.http.post(`${this.url}/`, user)
  }

  saveTokens(result: { token: string; user: UserModel }) {
    localStorage.setItem('nofood.token', result.token)
    localStorage.setItem('nofood.user', JSON.stringify(result.user))
  }

  getLoggedUser(): UserModel {
    return JSON.parse(localStorage.getItem('nofood.user'))
  }

  updateLoggedUser(user: UserModel) {
    localStorage.setItem('nofood.user', JSON.stringify(user))
  }

  isLoggedIn() {
    return !!localStorage.getItem('nofood.token')
  }

  static getToken() {
    return localStorage.getItem('nofood.token')
  }
}
