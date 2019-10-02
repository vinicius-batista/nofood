import { PipesModule } from './../pipes/pipes.module'
import { IonicModule } from 'ionic-angular'
import { NgModule } from '@angular/core'
import { QuantityComponent } from './quantity/quantity'
import { ProductListItemComponent } from './product-list-item/product-list-item'
@NgModule({
  declarations: [QuantityComponent, ProductListItemComponent],
  imports: [IonicModule, PipesModule],
  exports: [QuantityComponent, ProductListItemComponent],
})
export class ComponentsModule {}
