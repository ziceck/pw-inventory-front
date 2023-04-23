import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * This service is used to hide and show spinner.
 */
@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private loading = new BehaviorSubject<boolean>(false);
  readonly isLoading: any;

  constructor() {
    this.isLoading = this.loading.asObservable();
  }

  /**
   * Emit a value indicating spinner should be showed.
   */
  show(): void {
    this.loading.next(true);
  }


  /**
   * Emit a value indicating spinner should be hidden.
   */
  hide(): void {
    this.loading.next(false);
  }

}
