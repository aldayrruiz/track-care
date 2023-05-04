import { Injectable } from '@angular/core';
import { CanLoad } from '@angular/router';
import { RouterService } from '@core/services/router.service';
import { StorageService } from '@core/services/storage.service';

@Injectable({ providedIn: 'root' })
export class AutoLoginGuard implements CanLoad {
  constructor(private storageService: StorageService, private routerService: RouterService) {}

  async canLoad() {
    const jwt = this.storageService.getJWT();
    if (jwt) {
      await this.routerService.goToHome();
      return false;
    } else {
      return true;
    }
  }
}
