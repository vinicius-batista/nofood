import { Platform } from 'ionic-angular'
import { Injectable } from '@angular/core'
import { Network } from '@ionic-native/network'

@Injectable()
export class NetworkProvider {
  constructor(public platform: Platform, public network: Network) {}

  get isOnline(): boolean {
    if (this.platform.is('cordova')) {
      if (this.network.type) {
        return this.network.type !== 'unknown' && this.network.type !== 'none'
      }

      return true
    }

    return navigator.onLine
  }
}
