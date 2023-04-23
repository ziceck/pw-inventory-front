import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Module } from '@models/menu';
import { LoginService } from '@services/security';

/**
 * This service contains all menus showed in left menu on application.
 */
@Injectable({
  providedIn: 'root',
})
export class MenuService {

  modules: any[];

  constructor(private loginService: LoginService) {
  }

  /**
   * Return only available menus for current role.
   */
  menuAndRoles(): Observable<Module[]> {
    this.modules = [
      this.moduleHome,
      this.moduleCategories,
      this.moduleBrands,
      this.moduleItems,
      this.moduleSales,
      this.modulePurchases,
      this.moduleItemsOutputs,
      this.moduleUsers
    ];
    return new Observable<any>((observer) => {
      observer.next(this.filter());
      observer.complete();
    });
  }

  get moduleHome(): Module {
    return {
      module: 'home',
      roles: ['ROLE_ADMIN', 'ROLE_SELLER'],
      url: 'home',
      icon: 'home',
      name: 'Home',
      submodules: []
    };
  }

  get moduleItems(): Module {
    return {
      module: 'items',
      roles: ['ROLE_ADMIN', 'ROLE_SELLER'],
      url: 'items',
      icon: 'inventory',
      name: 'Productos',
      submodules: [],
    };
  }

  get moduleSales(): Module {
    return {
      module: 'sales',
      roles: ['ROLE_ADMIN', 'ROLE_SELLER'],
      url: 'sales',
      icon: 'shopping_cart',
      name: 'Ventas',
      submodules: [],
    };
  }

  get moduleItemsOutputs(): Module {
    return {
      module: 'items-outputs',
      roles: ['ROLE_ADMIN'],
      url: 'items-outputs',
      icon: 'trending_down',
      name: 'Baja de productos',
      submodules: []
    };
  }

  get modulePurchases(): Module {
    return {
      module: 'purchases',
      roles: ['ROLE_ADMIN'],
      url: 'purchases',
      icon: 'store',
      name: 'Compras',
      submodules: [],
    };
  }

  get moduleCategories(): Module {
    return {
      module: 'categories',
      roles: ['ROLE_ADMIN', 'ROLE_SELLER'],
      url: 'categories',
      icon: 'bookmark',
      name: 'Categorías',
      submodules: []
    };
  }

  get moduleBrands(): Module {
    return {
      module: 'brands',
      roles: ['ROLE_ADMIN', 'ROLE_SELLER'],
      url: 'brands',
      icon: 'sell',
      name: 'Marcas',
      submodules: []
    };
  }

  get moduleUsers(): Module {
    return {
      module: 'users',
      roles: ['ROLE_ADMIN'],
      url: 'users',
      icon: 'people_alt',
      name: 'Usuarios',
      submodules: []
    };
  }

  /**
   * Filter all menus available for current user and role.
   */
  private filter(): any[] {
    const currentUser = this.loginService.storageService.getCurrentUser();
    const rolesCurrentUser = currentUser ? currentUser.roles : [];
    return this.modules.filter((m) =>
        m.roles.some((r) => rolesCurrentUser.indexOf(r) >= 0)
    );
  }

}
