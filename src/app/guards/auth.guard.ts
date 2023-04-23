import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '@services/security';
import { NotificationService } from '@services/notifications';

/**
 * This component check if you can access to a view.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
      private router: Router,
      private notificationService: NotificationService,
      private loginService: LoginService
  ) {
  }

  canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const currentUser = this.loginService.storageService.getCurrentUser();
    if (!currentUser) {
      /* TODO: Clear storage */
      this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
    } else if (this.validRole(currentUser, next.data)) {
      return true;
    } else {
      /*this.router.navigate(['/forbidden']).then(() => {
        this.notificationService.error('No tiene permisos para acceder a esta página');
      });*/
      this.logout(state);
      return false;
    }
  }

  /**
   * Check if some role in current user match with valid roles.
   * @param currentUser Current user in session.
   * @param data Data from routing.
   */
  private validRole(currentUser: any, data: any): boolean {
    const rolesCurrenUser = currentUser ? currentUser.roles : [];
    const rolesData = data ? data.roles : [];
    const anyRole = rolesData.some(rd => rolesCurrenUser.indexOf(rd) >= 0);
    return currentUser && anyRole;
  }

  /**
   * Clear localStorage and redirect to login view.
   */
  private logout(state: any): void {
    this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}}).then(() => {
      this.notificationService.error('No tiene permisos para acceder a esta vista');
    });
  }

}
