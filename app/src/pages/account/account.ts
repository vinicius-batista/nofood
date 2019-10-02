import { CameraProvider } from './../../providers/camera/camera'
import { AlertProvider } from './../../providers/alert/alert'
import { UserModel } from './../../app/models/User'
import { UserProvider } from './../../providers/user/user'
import { Component } from '@angular/core'
import {
  IonicPage,
  NavController,
  NavParams,
  ActionSheetController,
} from 'ionic-angular'

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {
  loggedUser: UserModel

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userProvider: UserProvider,
    public alertProvider: AlertProvider,
    public cameraProvider: CameraProvider,
    public actionSheet: ActionSheetController
  ) {
    this.loggedUser = this.userProvider.getLoggedUser()
  }

  ionViewDidEnter() {
    this.loggedUser = this.userProvider.getLoggedUser()
  }

  changePhoto() {
    let action = this.actionSheet.create({
      title: 'Foto',
      buttons: [
        {
          text: 'Limpar',
          handler: () => {
            this.loggedUser.photo = null
          },
        },
        {
          text: 'Tirar Foto',
          handler: () => {
            this.cameraProvider.getPictureFromGallery().then(photo => {
              if (photo) {
                this.loggedUser.photo = photo
              }
            })
          },
        },
        { text: 'Cancelar', handler: () => {}, role: 'destructive' },
      ],
    })
    action.present()
  }

  save() {
    this.userProvider.put(this.loggedUser._id, this.loggedUser).then(result => {
      if (result.success) {
        this.alertProvider.toast('Dados atualizados com sucesso', 'bottom')
        this.userProvider.updateLoggedUser(result.data)
      }
    })
  }
}
