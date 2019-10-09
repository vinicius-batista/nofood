import { UserProvider } from './../user/user'
import { NetworkProvider } from './../network/network'
import { AlertProvider } from './../alert/alert'
import { SpinnerProvider } from './../spinner/spinner'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { HttpResultModel } from '../../app/models/HttpResultModel'

@Injectable()
export class HttpProvider {
  constructor(
    public http: HttpClient,
    public spinner: SpinnerProvider,
    public alert: AlertProvider,
    public network: NetworkProvider
  ) {}

  public createHeaders(header: HttpHeaders = new HttpHeaders()): HttpHeaders {
    header = header.append('Content-Type', 'application/json')
    header = header.append('Accept', 'application/json')
    header = header.append('x-access-token', UserProvider.getToken() || '')

    return header
  }

  public get(url: string): Promise<HttpResultModel> {
    this.spinner.show('Carregando dados')
    const headers = this.createHeaders()

    return new Promise(resolve => {
      if (this.network.isOnline) {
        return this.http.get(url, { headers }).subscribe(
          data => {
            this.spinner.hide()
            return resolve({ success: true, data, errors: null })
          },
          errors => {
            this.spinner.hide()
            this.alert.toast('Nao foi possivel consultar os dados', 'bottom')
            return resolve({ success: false, data: null, errors })
          }
        )
      }

      this.alert.toast('Voce esta offline', 'bottom')
      resolve({ success: false, data: null, errors: null })
    })
  }

  public post(url: string, model: any): Promise<HttpResultModel> {
    this.spinner.show('Carregando dados')
    const headers = this.createHeaders()
    return new Promise(resolve => {
      if (this.network.isOnline) {
        return this.http.post(url, model, { headers }).subscribe(
          data => {
            this.spinner.hide()
            console.log('result ', data)
            return resolve({ success: true, data, errors: null })
          },
          errors => {
            this.spinner.hide()

            if (errors.status === 400) {
              let msg = ''
              errors.error.validation.forEach(element => {
                msg += `<li>${element.message}</li>`
              })

              this.alert.alert(errors.error.message, msg)
            }

            if (errors.status === 404) {
              this.alert.alert('Informacao', errors.error.message)
            }

            console.log('err ', errors)
            return resolve({ success: false, data: null, errors })
          }
        )
      }

      this.alert.toast('Voce esta offline', 'bottom')
      resolve({ success: false, data: null, errors: null })
    })
  }

  public put(url: string, model: any): Promise<HttpResultModel> {
    this.spinner.show('Carregando dados')
    const headers = this.createHeaders()

    return new Promise(resolve => {
      if (this.network.isOnline) {
        return this.http.put(url, model, { headers }).subscribe(
          data => {
            this.spinner.hide()
            return resolve({ success: true, data, errors: null })
          },
          errors => {
            this.spinner.hide()

            if (errors.status === 400) {
              let msg = ''
              errors.error.validation.forEach(element => {
                msg += `<li>${element.message}</li>`
              })

              this.alert.alert(errors.error.message, msg)
            }

            return resolve({ success: false, data: null, errors })
          }
        )
      }

      this.alert.toast('Voce esta offline', 'bottom')
      resolve({ success: false, data: null, errors: null })
    })
  }

  public delete(url: string): Promise<HttpResultModel> {
    this.spinner.show('Carregando dados')
    const headers = this.createHeaders()

    return new Promise(resolve => {
      if (this.network.isOnline) {
        return this.http.delete(url, { headers }).subscribe(
          data => {
            this.spinner.hide()
            return resolve({ success: true, data, errors: null })
          },
          errors => {
            this.spinner.hide()

            if (errors.status === 400) {
              let msg = ''
              errors.error.validation.forEach(element => {
                msg += `<li>${element.message}</li>`
              })

              this.alert.alert(errors.error.message, msg)
            }

            return resolve({ success: false, data: null, errors })
          }
        )
      }

      this.alert.toast('Voce esta offline', 'bottom')
      resolve({ success: false, data: null, errors: null })
    })
  }
}
