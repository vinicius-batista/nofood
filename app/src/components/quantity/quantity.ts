import {
  Component,
  Output,
  EventEmitter,
  Input,
  OnChanges,
} from '@angular/core'

@Component({
  selector: 'Quantity',
  templateUrl: 'quantity.html',
})
export class QuantityComponent implements OnChanges {
  number: number = 0
  @Output() numberChanged = new EventEmitter()
  @Input('productQuantity') productQuantity: number

  constructor() {}

  ngOnChanges() {
    if (this.productQuantity) {
      this.number = this.productQuantity
    }
  }

  add() {
    this.number = this.number + 1
    this.numberChanged.emit(this.number)
  }

  sub() {
    const numberSub = this.number - 1

    if (numberSub === -1) {
      this.number = 0
      return
    }

    this.number = numberSub
    this.numberChanged.emit(this.number)
  }
}
