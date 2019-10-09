import { CategoryProvider } from './../../providers/category/category'
import { CategoryModel } from './../../app/models/Category'
import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'

@IonicPage()
@Component({
  selector: 'page-adm-categories',
  templateUrl: 'adm-categories.html',
})
export class AdmCategoriesPage {
  categoriesList: CategoryModel[] = []
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public categoryProvider: CategoryProvider
  ) {
    this.loadCategories()
  }

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

  addOrEdit(category?: CategoryModel) {
    this.navCtrl.push('AdmCategoryPage', { category })
  }
}
