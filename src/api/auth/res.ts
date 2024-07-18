import { IPublicUser } from '../../types/models';

export interface LoginResponse extends IPublicUser {
  token: string;
}
