import { Pipe, PipeTransform } from '@angular/core';

/**
 * This pipe transform the role of the current user in a legible role.
 */
@Pipe({
  name: 'role'
})
export class RolePipe implements PipeTransform {

  /**
   * If rol is ROLE_ADMIN return administrador else return vendedor.
   * @param roles roles of the current user
   * @param args Not used in this transform
   */
  transform(roles: string[], ...args: any[]): string {
    const rol = roles.length > 0 ? roles[0] : '';
    if (rol === 'ROLE_ADMIN') {
      return 'administrador';
    }
    return 'vendedor';
  }

}
