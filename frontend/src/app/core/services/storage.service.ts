import { Injectable } from '@angular/core';
import { JWT } from '@core/models/jwt.model';
import { User } from '@core/models/users/user.model';

export const JWT_KEY = 'jwt';
export const USER_KEY = 'user';

@Injectable({ providedIn: 'root' })
export class StorageService {
  storeUser(user: User) {
    this.set(USER_KEY, JSON.stringify(user));
  }

  getUser() {
    const user = this.get(USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  storeJWT(jwt: JWT) {
    this.set(JWT_KEY, JSON.stringify(jwt));
  }

  getJWT() {
    const jwt = this.get(JWT_KEY);
    return jwt ? JSON.parse(jwt) : null;
  }

  removeAll() {
    this.remove(JWT_KEY);
  }

  private set(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  private get(key: string) {
    return localStorage.getItem(key);
  }

  private remove(key: string): void {
    localStorage.removeItem(key);
  }
}
