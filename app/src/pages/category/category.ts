import { CategoryModel } from './../../app/models/Category'
import { CategoryProvider } from './../../providers/category/category'
import { Component } from '@angular/core'
import {
  IonicPage,
  NavController,
  NavParams,
  ActionSheetController,
} from 'ionic-angular'

@IonicPage()
@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})
export class CategoryPage {
  categoriesList: CategoryModel[] = []

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public categoryProvider: CategoryProvider,
    public actionSheetController: ActionSheetController
  ) {}

  ionViewDidEnter() {
    this.loadCategories()
  }

  loadCategories() {
    this.categoryProvider.get().then(result => {
      if (result.success) {
        this.categoriesList = result.data
      }
    })
  }

  adminOptions() {
    this.actionSheetController
      .create({
        title: 'Admnistracao',
        buttons: [
          {
            text: 'Gerenciar Categorias',
            handler: () => {
              this.manageCategories()
            },
          },
          {
            text: 'Gerenciar Produtos',
            handler: () => {
              this.manageProducts()
            },
          },
          { text: 'Cancelar', handler: () => {}, role: 'destructive' },
        ],
      })
      .present()
  }

  manageCategories() {
    this.navCtrl.push('AdmCategoriesPage')
  }

  manageProducts() {
    this.navCtrl.push('AdmProductsPage')
  }

  openProduct(category: CategoryModel) {
    localStorage.setItem('nofood.category', JSON.stringify(category))
    this.navCtrl.push('TabsPage', { category })
  }
}
