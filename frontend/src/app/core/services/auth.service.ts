import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JWT } from '@core/models/jwt.model';
import { environment } from 'src/environments/environment';
import { RouterService } from './router.service';
import { StorageService } from './storage.service';
import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private storageService: StorageService,
    private routerService: RouterService,
    private userService: UserService,
    private http: HttpClient
  ) {}

  signIn(email: string, password: string) {
    return this.http.post<JWT>(`${environment.api}/api/auth/signIn`, { email, password });
  }

  logout() {
    this.storageService.removeAll();
    this.routerService.goToSignIn();
  }

  refreshToken() {
    const refreshToken = this.storageService.getJWT().refreshToken;
    const headers = { Authorization: `Bearer ${refreshToken}` };
    return this.http.get<JWT>(`${environment.api}/api/auth/refresh`, { headers });
  }

  getPayloadFromJwt(jwtToken: string) {
    const parts = jwtToken.split('.');
    const payload = window.atob(parts[1]);
    return JSON.parse(payload);
  }

  storeImportantVariables(jwt: JWT) {
    // Store JWT
    this.storageService.storeJWT(jwt);

    // Get and store user
    const userId = this.getPayloadFromJwt(jwt.accessToken).sub;
    this.userService.get(userId).subscribe((user) => this.storageService.storeUser(user));
  }
}
