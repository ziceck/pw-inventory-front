import { User } from '@models/security/user.model';
import { Role } from '@models/security/role.model';

export interface UserRole {
  id?: number;
  user: number | User;
  role: number | Role;
}
