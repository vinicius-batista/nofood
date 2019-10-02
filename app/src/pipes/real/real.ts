import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'real',
})
export class RealPipe implements PipeTransform {
  transform(value: number, ...args) {
    return Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)
  }
}
