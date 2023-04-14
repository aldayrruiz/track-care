import { UserRole } from './role.model';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  smartwatch?: string;
}
