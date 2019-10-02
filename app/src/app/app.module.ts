import { Network } from '@ionic-native/network'
import { BrowserModule } from '@angular/platform-browser'
import { ErrorHandler, NgModule } from '@angular/core'
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular'
import { SplashScreen } from '@ionic-native/splash-screen'
import { StatusBar } from '@ionic-native/status-bar'
import { Camera } from '@ionic-native/camera'
import { OneSignal } from '@ionic-native/onesignal'

import { MyApp } from './app.component'
import { SpinnerProvider } from '../providers/spinner/spinner'
import { AlertProvider } from '../providers/alert/alert'
import { HttpProvider } from '../providers/http/http'
import { NetworkProvider } from '../providers/network/network'
import { UserProvider } from '../providers/user/user'
import { HttpClientModule } from '@angular/common/http'
import { CategoryProvider } from '../providers/category/category'
import { CameraProvider } from '../providers/camera/camera'
import { ProductProvider } from '../providers/product/product'
import { CartProvider } from '../providers/cart/cart'

@NgModule({
  declarations: [MyApp],
  imports: [BrowserModule, IonicModule.forRoot(MyApp), HttpClientModule],
  bootstrap: [IonicApp],
  entryComponents: [MyApp],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    SpinnerProvider,
    AlertProvider,
    HttpProvider,
    NetworkProvider,
    UserProvider,
    CategoryProvider,
    CameraProvider,
    Camera,
    OneSignal,
    Network,
    ProductProvider,
    CartProvider,
  ],
})
export class AppModule {}
