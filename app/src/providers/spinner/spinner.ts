import { Injectable } from '@angular/core'
import { LoadingController, Loading } from 'ionic-angular'

/*
  Generated class for the SpinnerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SpinnerProvider {
  private spinner: Loading = null

  constructor(public loading: LoadingController) {}

  show(message: string) {
    if (!this.spinner) {
      this.spinner = this.loading.create({ content: message })
      this.spinner.present()
      return
    }

    this.spinner.data.content = message
  }

  hide() {
    if (this.spinner) {
      this.spinner.dismiss()
      this.spinner = null
    }
  }
}
