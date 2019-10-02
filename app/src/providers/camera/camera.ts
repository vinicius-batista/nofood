import { Platform } from 'ionic-angular'
import { Injectable } from '@angular/core'
import { Camera, CameraOptions } from '@ionic-native/camera'

@Injectable()
export class CameraProvider {
  constructor(private plataform: Platform, private camera: Camera) {}

  private getPicture(source: number) {
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: source,
      encodingType: this.camera.EncodingType.JPEG,
      correctOrientation: true,
    }

    if (this.plataform.is('cordova')) {
      return this.camera
        .getPicture(options)
        .then(img => `data:image/jpeg;base64,${img}`)
        .catch(console.log)
    }

    return Promise.resolve('')
  }

  getPictureFromGallery() {
    return this.getPicture(this.camera.PictureSourceType.PHOTOLIBRARY)
  }

  takePicture() {
    return this.getPicture(this.camera.PictureSourceType.CAMERA)
  }
}
