import { Component } from '@angular/core';
import { MenuService } from '@services/menu';
import { Router } from '@angular/router';
import { Module } from '@models/menu';

/**
 * This component render menu in left side of the screen.
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  modulesAndRoles: Module[];

  constructor(
      private menuService: MenuService,
      public router: Router
  ) {
    this.getModulesAndRoles();
  }

  /**
   * Get all available roles for current role.
   */
  getModulesAndRoles(): void {
    this.menuService.menuAndRoles().subscribe(modulesAndRoles => {
      this.modulesAndRoles = modulesAndRoles;
    });
  }

}
