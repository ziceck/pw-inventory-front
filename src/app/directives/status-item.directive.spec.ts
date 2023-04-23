/* tslint:disable:no-string-literal */
import { StatusItemDirective } from './status-item.directive';

describe('StatusItemDirective', () => {

  let directive: StatusItemDirective;

  beforeEach(() => {
    directive = new StatusItemDirective(mockElementRef);
    directive.minimum = 40;
    directive.quantity = 2;
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('on init', () => {
    const spy = spyOn<any>(directive, 'setBackGroundColor');
    directive.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('set background should work', () => {
    directive['setBackGroundColor']();
    expect(directive['element'].nativeElement.style.backgroundColor).toBe('red');
  });

});

const mockElementRef: any = {
  nativeElement: {
    style: {
      setBackground: (value: string) => {}
    }
  }
};
