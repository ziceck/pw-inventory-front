import { Roles } from '@models/security/role.model';

export interface User {
  id?: number;
  username: string;
  roles: Roles;
}
