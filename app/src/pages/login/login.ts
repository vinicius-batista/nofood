import { UserProvider } from './../../providers/user/user'
import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  form = {
    email: '',
    password: '',
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private userProvider: UserProvider
  ) {}

  openCategory() {
    this.navCtrl.setRoot('CategoryPage')
  }

  login() {
    this.userProvider
      .authenticate(this.form.email, this.form.password)
      .then(result => {
        if (result.success) {
          this.userProvider.saveTokens(result.data)
          this.openCategory()
        }
      })
  }

  signUp() {
    this.navCtrl.setRoot('SignUpPage')
  }
}
