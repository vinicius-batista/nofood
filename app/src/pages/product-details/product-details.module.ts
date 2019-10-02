import { PipesModule } from './../../pipes/pipes.module'
import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { ProductDetailsPage } from './product-details'

@NgModule({
  declarations: [ProductDetailsPage],
  imports: [PipesModule, IonicPageModule.forChild(ProductDetailsPage)],
})
export class ProductDetailsPageModule {}
