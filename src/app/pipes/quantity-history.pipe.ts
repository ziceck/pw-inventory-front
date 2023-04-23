import { Pipe, PipeTransform } from '@angular/core';

/**
 * This pipe add + or - to show increase or decrease stock.
 */
@Pipe({
  name: 'quantityHistory'
})
export class QuantityHistoryPipe implements PipeTransform {

  /**
   * Add to a number - if is part of a sale or + if is part of a purchase.
   * @param value Number displayed in the view.
   * @param args Arg in [0] is Creación | Compra | Venta.
   */
  transform(value: any, ...args: any[]): string {
    const type = args[0];
    if (!type || type === 'Creación') {
      return value;
    }
    if (type === 'Compra') {
      return '+' + value;
    }
    if (type === 'Venta' || type === 'Baja de inventario') {
      return '-' + value;
    }
  }

}
