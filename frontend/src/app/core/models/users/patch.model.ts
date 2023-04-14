import { UserRole } from './role.model';

export interface EditPatchUser {
  email?: string;
  name?: string;
  smartwatch?: string;
  role?: UserRole;
}
