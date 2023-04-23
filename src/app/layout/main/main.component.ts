import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay, take } from 'rxjs/operators';

import { LoginService } from '@services/security';
import { Jwt } from '@models/security';
import { ExpiredSessionService, NotificationService, TIME_TO_EXPIRE } from '@services/notifications';
import { MatDialog } from '@angular/material/dialog';
import { CONTINUE_SESSION, DialogExpiredSessionComponent, EXPIRED_SESSION } from '@shared/.';
import { START_TIME } from '@shared/local-storage-keys';

/**
 * This component is the main in the application and contains all other components.
 */
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {

  currentUser: Jwt;

  isHandset$: Observable<boolean> = this.breakpointObserver
      .observe(Breakpoints.Handset)
      .pipe(
          map((result) => result.matches),
          shareReplay()
      );

  constructor(
      private breakpointObserver: BreakpointObserver,
      private loginService: LoginService,
      private expiredSessionService: ExpiredSessionService,
      private matDialog: MatDialog,
      private notificationService: NotificationService
  ) {
    this.currentUser = this.loginService.storageService.getCurrentUser();
  }

  ngOnInit(): void {
    const startTime = +localStorage.getItem(START_TIME);
    const timeElapsed = new Date().getTime() - startTime;
    if (timeElapsed > TIME_TO_EXPIRE) {
      this.logout();
    } else if (!this.expiredSessionService.sessionTimer) {
      this.expiredSessionService.initTimer(timeElapsed);
    }
    this.checkTimer();
  }

  /**
   * Close current session.
   */
  logout(): void {
    this.notificationService.success('Ha cerrado su sesión');
    this.loginService.logout();
  }

  /**
   * Subscribe to timer to know when session is close to expire.
   */
  private checkTimer(): void {
    this.expiredSessionService.expiredSession.pipe(take(1)).subscribe(
        value => this.openSessionExpiredDialog()
    );
  }

  /**
   * Show dialog to notify session is near to expire.
   */
  private openSessionExpiredDialog(): void {
    this.matDialog.open(DialogExpiredSessionComponent, {
      disableClose: true,
      width: '500px',
      data: {}
    }).afterClosed().subscribe((value: number) => {
      if (value === CONTINUE_SESSION) {
        this.refreshToken();
      } else {
        console.log('logout');
        value === EXPIRED_SESSION
            ? this.notificationService.warning('La sesión ha expirado')
            : this.notificationService.success('Ha cerrado su sesión');
        this.loginService.logout();
      }
    });
  }

  private refreshToken(): void {
    this.loginService.refreshToken().subscribe(() => {
      this.expiredSessionService.initTimer();
      this.checkTimer();
    });
  }

}
