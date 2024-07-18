import { Role } from '../types/enums';
import { IUser } from '../types/models';

export function roler<T>(roles: Role[] | IUser, data: Record<Role, T>) {
  if (!Array.isArray(roles)) {
    roles = roles.roles;
  }

  if (roles.includes(Role.ADMIN)) {
    return data['ADMIN'];
  }

  if (roles.includes(Role.MODERATOR)) {
    return data['MODERATOR'];
  }

  return data['MEMBER'];
}
