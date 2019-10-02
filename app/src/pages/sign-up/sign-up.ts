import { AlertProvider } from './../../providers/alert/alert'
import { UserProvider } from './../../providers/user/user'
import { UserModel } from './../../app/models/User'
import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {
  user: UserModel = new UserModel()

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private userProvider: UserProvider,
    private alertProvider: AlertProvider
  ) {}

  signUp() {
    this.userProvider.signUp(this.user).then(result => {
      if (result.success) {
        this.alertProvider.toast('Cadastro realizado com sucesso', 'bottom')
        this.navCtrl.setRoot('LoginPage')
      }
    })
  }

  cancel() {
    this.navCtrl.setRoot('LoginPage')
  }
}
