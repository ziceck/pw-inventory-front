import { Component, OnDestroy, OnInit } from '@angular/core';

/**
 * This component is used to show 404 error.
 */
@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit, OnDestroy {

  constructor() {
    this.jsCode();
  }

  ngOnInit(): void {
  }

  /**
   * Add listener to mouse move
   */
  private jsCode(): void {
    document.addEventListener('mousemove', this.move);
  }

  /**
   * Remove listener when component is destroyed.
   */
  ngOnDestroy(): void {
    document.removeEventListener('mousemove', this.move);
  }

  /**
   * Check movement of the mouse in the screen.
   * @param event Event from mouse.
   */
  move(event): void {
    const pageX = document.documentElement.clientWidth;
    const pageY = document.documentElement.clientHeight;

    // verticalAxis
    const mouseY = event.pageY;
    const yAxis = (pageY / 2 - mouseY) / pageY * 300;
    // horizontalAxis
    const mouseX = event.pageX / -pageX;
    const xAxis = -mouseX * 100 - 100;
    const ghost: any = document.getElementsByClassName('box__ghost-eyes')[0];
    ghost.style.transform = 'translate(' + xAxis + '%,-' + yAxis + '%)';
  }


}
