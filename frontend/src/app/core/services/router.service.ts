import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class RouterService {
  extras = { replaceUrl: true };

  constructor(private router: Router, private route: ActivatedRoute) {}

  async goTo(to: string) {
    return this.router.navigateByUrl(to, this.extras);
  }

  async goToHome() {
    const to = `admin`;
    return this.router.navigateByUrl(to, this.extras);
  }

  async goToSignIn() {
    const to = `auth/signIn`;
    return this.router.navigateByUrl(to, this.extras);
  }

  async goToUsers() {
    const to = `admin/users`;
    return this.router.navigateByUrl(to, this.extras);
  }

  async goToEditUser(userId: string) {
    const to = `admin/users/edit/${userId}`;
    return this.router.navigateByUrl(to, this.extras);
  }

  async goToSmartwatches() {
    const to = `admin/smartwatches`;
    return this.router.navigateByUrl(to, this.extras);
  }
}
