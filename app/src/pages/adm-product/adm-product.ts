import { ProductProvider } from './../../providers/product/product'
import { CategoryModel } from './../../app/models/Category'
import { ProductModel } from './../../app/models/Product'
import { CameraProvider } from './../../providers/camera/camera'
import { CategoryProvider } from './../../providers/category/category'
import { AlertProvider } from './../../providers/alert/alert'
import { HttpResultModel } from './../../app/models/HttpResultModel'
import { Component } from '@angular/core'
import {
  IonicPage,
  NavController,
  NavParams,
  ActionSheetController,
} from 'ionic-angular'

@IonicPage()
@Component({
  selector: 'page-adm-product',
  templateUrl: 'adm-product.html',
})
export class AdmProductPage {
  product: ProductModel
  categoriesList: CategoryModel[] = []

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public actionSheetController: ActionSheetController,
    public camera: CameraProvider,
    public categoryProvider: CategoryProvider,
    public alertProvider: AlertProvider,
    public productProvider: ProductProvider
  ) {
    this.product = this.navParams.get('product') || new ProductModel()
    this.loadCategories()
  }

  loadCategories() {
    this.categoryProvider.get().then(result => {
      if (result.success) {
        this.categoriesList = result.data
      }
    })
  }

  goToAdmProductsPage = (result: HttpResultModel) => {
    if (result.success) {
      this.navCtrl.pop()
    }
  }

  save() {
    if (this.product._id) {
      return this.productProvider
        .put(this.product._id, this.product)
        .then(this.goToAdmProductsPage)
    }

    this.productProvider.post(this.product).then(this.goToAdmProductsPage)
  }

  delete() {
    if (this.product._id) {
      this.alertProvider.confirm(
        'Excluir?',
        'Deseja realmente excluir?',
        () => {
          this.productProvider
            .delete(this.product._id)
            .then(this.goToAdmProductsPage)
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
                  this.product.photo = photo
                }
              })
            },
          },
          {
            text: 'Pegar da galeria',
            handler: () => {
              this.camera.getPictureFromGallery().then(photo => {
                if (photo) {
                  this.product.photo = photo
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
