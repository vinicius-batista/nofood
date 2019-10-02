import { Injectable } from '@angular/core'
import { AlertController, ToastController } from 'ionic-angular'

@Injectable()
export class AlertProvider {
  constructor(
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  toast(message: string, position: string) {
    this.toastController
      .create({
        message,
        position,
        duration: 3000,
      })
      .present()
  }

  alert(title: string, message: string) {
    this.alertController
      .create({
        message,
        title,
        buttons: ['Ok'],
        enableBackdropDismiss: false,
      })
      .present()
  }

  confirm(title: string, message: string, callback: any) {
    this.alertController
      .create({
        title,
        message,
        buttons: [
          {
            text: 'Nao',
            handler() {
              console.log('Confirm:Say:No')
            },
            role: 'Cancel',
          },
          {
            text: 'Sim',
            handler() {
              callback()
            },
          },
        ],
      })
      .present()
  }
}
