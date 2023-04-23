import { EventEmitter, Injectable } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { START_TIME } from '@shared/local-storage-keys';

export const TIME_TO_EXPIRE = 3_600_000; // time in milliseconds = 1 hour

/**
 * This service is used to manage the expiration time to notify session is close to expire.
 */
@Injectable({
  providedIn: 'root'
})
export class ExpiredSessionService {

  private readonly TIME = TIME_TO_EXPIRE; // time in mili seconds
  expiredSession: EventEmitter<boolean>;
  sessionTimer: Subscription;

  constructor() {
    // this.TIME = 25000;
    this.expiredSession = new EventEmitter<boolean>();
  }

  /**
   * Start the countdown for expire session.
   * @param timeElapsed time elapsed if the time was initialized previously
   */
  initTimer(timeElapsed: number = 0): void {
    const timeDisplayedInDialog = 15_000; // this is equivalent to 15 seconds
    localStorage.setItem(START_TIME, new Date().getTime().toString());
    this.sessionTimer = timer(this.TIME - timeElapsed - timeDisplayedInDialog).subscribe(
        () => this.expiredSession.emit(true)
    );
  }

}
