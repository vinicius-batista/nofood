import { ComponentsModule } from './../../components/components.module'
import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { ProductsPage } from './products'
import { PipesModule } from '../../pipes/pipes.module'

@NgModule({
  declarations: [ProductsPage],
  imports: [
    PipesModule,
    ComponentsModule,
    IonicPageModule.forChild(ProductsPage),
  ],
})
export class ProductsPageModule {}
