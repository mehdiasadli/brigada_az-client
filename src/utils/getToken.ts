import { AUTH_STORAGE_KEY } from '../store/auth.store';

export function getToken() {
  return JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY) ?? '{}')?.state?.token;
}
