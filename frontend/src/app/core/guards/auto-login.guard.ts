import { Injectable } from '@angular/core';
import { CanLoad } from '@angular/router';
import { RouterService } from '@core/services/router.service';
import { StorageService } from '@core/services/storage.service';

@Injectable({ providedIn: 'root' })
export class AutoLoginGuard implements CanLoad {
  constructor(private storageService: StorageService, private routerService: RouterService) {}

  canLoad() {
    const jwt = this.storageService.getJWT();
    if (jwt) {
      this.routerService.goToHome();
      return false;
    } else {
      return true;
    }
  }
}
