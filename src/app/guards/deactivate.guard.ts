import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

/**
 * This guard is used to check if you can leave a view.
 */
@Injectable({
  providedIn: 'root'
})
export class DeactivateGuard implements CanDeactivate<any> {

  canDeactivate(
      component: CanComponentDeactivate,
      currentRoute: ActivatedRouteSnapshot,
      currentState: RouterStateSnapshot,
      nextState?: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (component.canDeactivate()) {
      return true;
    } else {
      return window.confirm('Si sales de esta página se perderán los datos, ¿Estás seguro que deseas salir?');
    }
  }

}

/**
 * This interface is used in all components that need a deactivated.guard.
 */
export interface CanComponentDeactivate {
  canDeactivate(): boolean;
}
