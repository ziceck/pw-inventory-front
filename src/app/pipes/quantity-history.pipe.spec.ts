import { QuantityHistoryPipe } from './quantity-history.pipe';

describe('QuantityHistoryPipe', () => {

  const pipe: QuantityHistoryPipe = new QuantityHistoryPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transform creation', () => {
    expect(pipe.transform('2', 'Creación')).toBe('2');
  });

  it('transform sale', () => {
    expect(pipe.transform('2', 'Compra')).toBe('+2');
  });

  it('transform purchase or item output', () => {
    expect(pipe.transform('2', 'Venta')).toBe('-2');
    expect(pipe.transform('2', 'Baja de inventario')).toBe('-2');
  });

});
