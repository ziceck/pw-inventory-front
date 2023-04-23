import { Directive, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

/**
 * This directive changes the background color of a mat chip, depending on the status of an item.
 */
@Directive({
  selector: '[appStatusItem]'
})
export class StatusItemDirective implements OnInit, OnChanges {

  @Input()
  quantity: number;
  @Input()
  minimum: number;

  constructor(
      private element: ElementRef
  ) {
  }

  ngOnInit(): void {
    this.setBackGroundColor();
  }


  ngOnChanges(changes: SimpleChanges): void {
    this.setBackGroundColor();
  }

  /**
   * Set the background color in green if the status is enough and red if is low.
   */
  private setBackGroundColor(): void {
    const status = this.quantity >= this.minimum;
    if (status) {
      // this.element.nativeElement.innerText = 'Suficiente';
      this.element.nativeElement.style.backgroundColor = 'green';
    } else {
      // this.element.nativeElement.innerText = 'Bajo';
      this.element.nativeElement.style.backgroundColor = 'red';
    }
  }

}
