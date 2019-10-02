import { AlertProvider } from './../../providers/alert/alert'
import { HttpResultModel } from './../../app/models/HttpResultModel'
import { CategoryProvider } from './../../providers/category/category'
import { CameraProvider } from './../../providers/camera/camera'
import { CategoryModel } from './../../app/models/Category'
import { Component } from '@angular/core'
import {
  IonicPage,
  NavController,
  NavParams,
  ActionSheetController,
} from 'ionic-angular'

@IonicPage()
@Component({
  selector: 'page-adm-category',
  templateUrl: 'adm-category.html',
})
export class AdmCategoryPage {
  category: CategoryModel

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public actionSheetController: ActionSheetController,
    public camera: CameraProvider,
    public categoryProvider: CategoryProvider,
    public alertProvider: AlertProvider
  ) {
    this.category = this.navParams.get('category') || new CategoryModel()
  }

  goToAdmCategoriesPage = (result: HttpResultModel) => {
    if (result.success) {
      this.navCtrl.pop()
    }
  }

  save() {
    if (this.category._id) {
      return this.categoryProvider
        .put(this.category._id, this.category)
        .then(this.goToAdmCategoriesPage)
    }

    this.categoryProvider.post(this.category).then(this.goToAdmCategoriesPage)
  }

  delete() {
    if (this.category._id) {
      this.alertProvider.confirm(
        'Excluir?',
        'Deseja realmente excluir?',
        () => {
          this.categoryProvider
            .delete(this.category._id)
            .then(this.goToAdmCategoriesPage)
        }
      )
    }
  }

  getPictureOptions() {
    this.actionSheetController
      .create({
        title: 'Adicionar foto',
        buttons: [
          {
            text: 'Tirar foto',
            handler: () => {
              this.camera.takePicture().then(photo => {
                if (photo) {
                  this.category.photo = photo
                }
              })
            },
          },
          {
            text: 'Pegar da galeria',
            handler: () => {
              this.camera.getPictureFromGallery().then(photo => {
                if (photo) {
                  this.category.photo = photo
                }
              })
            },
          },
          { text: 'Cancelar', role: 'destructive' },
        ],
      })
      .present()
  }
}
