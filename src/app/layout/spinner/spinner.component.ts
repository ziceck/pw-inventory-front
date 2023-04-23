import { Component, Inject, Input, OnDestroy } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';

import { DOCUMENT } from '@angular/common';

/**
 * This component is used to show a spinner while navigations ends.
 */
@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnDestroy {

  public isSpinnerVisible = true;
  @Input() public backgroundColor = 'rgba(0, 115, 170, 0.69)';

  constructor(
      private router: Router,
      @Inject(DOCUMENT) private document: Document
  ) {
    this.subscribeNavigation();
  }

  /**
   * Subscribe to navigation changes to check if show or hide spinner.
   */
  private subscribeNavigation(): void {
    this.router.events.subscribe(
        event => {
          return this.checkNavigation(event);
        },
        () => {
          this.isSpinnerVisible = false;
        }
    );
  }

  /**
   * If navigation start show spinner else hide spinner.
   * @param event Event from navigation.
   */
  private checkNavigation(event: any): void {
    if (event instanceof NavigationStart) {
      this.isSpinnerVisible = true;
    } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
    ) {
      this.isSpinnerVisible = false;
    }
  }

  ngOnDestroy(): void {
    this.isSpinnerVisible = false;
  }

}
