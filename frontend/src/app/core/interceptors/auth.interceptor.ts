import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JWT } from '@core/models/jwt.model';
import { AuthService } from '@core/services/auth.service';
import { StorageService } from '@core/services/storage.service';
import { catchError, switchMap, throwError } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;

  constructor(private storageService: StorageService, private authService: AuthService) {}

  // This function is used to intercept requests, and then add an authorization header to the request with the access token.
  // If the request returns a 401 response, then the refresh token is used to get a new access token, and the request is retried.
  // If the refresh token fails, the user is logged out.

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const jwt = this.storageService.getJWT();

    if (jwt && jwt.accessToken && !this.isRefreshing) {
      req = this.addAuthHeaders(req, jwt.accessToken);
    }

    return next.handle(req).pipe(
      catchError((error) => {
        if (
          error instanceof HttpErrorResponse &&
          !req.url.includes('auth/signIn') &&
          error.status === 401
        ) {
          return this.handle401Error(req, next);
        }

        return throwError(() => error);
      })
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;

      const jwt = this.storageService.getJWT();

      if (jwt && jwt.refreshToken) {
        return this.authService.refreshToken().pipe(
          switchMap((response: JWT) => {
            this.isRefreshing = false;
            this.authService.storeImportantVariables(response);
            request = this.addAuthHeaders(request, response.accessToken);
            return next.handle(request);
          }),
          catchError((error) => {
            this.isRefreshing = false;

            if (error.status == '403') {
              this.authService.logout();
            }

            return throwError(() => error);
          })
        );
      }
    }

    return next.handle(request);
  }

  private addAuthHeaders(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
