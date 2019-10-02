import { PipesModule } from './../../pipes/pipes.module'
import { ComponentsModule } from './../../components/components.module'
import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { CartPage } from './cart'

@NgModule({
  declarations: [CartPage],
  imports: [ComponentsModule, PipesModule, IonicPageModule.forChild(CartPage)],
})
export class CartPageModule {}
