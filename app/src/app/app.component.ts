import { OneSignal, OSDisplayType } from '@ionic-native/onesignal'
import { UserProvider } from './../providers/user/user'
import { Component } from '@angular/core'
import { Platform } from 'ionic-angular'
import { StatusBar } from '@ionic-native/status-bar'
import { SplashScreen } from '@ionic-native/splash-screen'

@Component({
  templateUrl: 'app.html',
})
export class MyApp {
  rootPage: string = ''

  constructor(
    private platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public userProvider: UserProvider,
    private oneSignal: OneSignal
  ) {
    this.rootPage = userProvider.isLoggedIn() ? 'CategoryPage' : 'LoginPage'

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault()
      splashScreen.hide()
      this.configureOneSignal()
    })
  }

  private configureOneSignal() {
    if (this.platform.is('cordova')) {
      this.oneSignal.startInit('aab8bd60-eb5a-4146-8968-1093225d44fa')
      this.oneSignal.inFocusDisplaying(OSDisplayType.InAppAlert)

      this.oneSignal.handleNotificationReceived().subscribe(data => {
        console.log('notificacao aberta', data)
      })

      this.oneSignal.endInit()
    }
  }
}
