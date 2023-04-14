import { Component } from '@angular/core';
import { IsActiveMatchOptions, NavigationEnd, Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { RouterService } from '@core/services/router.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent {
  currentLink: any;
  navLinks = [
    {
      label: 'MAPA',
      link: 'admin/positions',
    },
    {
      label: 'USERS',
      link: 'admin/users',
    },
    {
      label: 'SMARTWATCHES',
      link: 'admin/smartwatches',
    },
  ];

  constructor(
    private authService: AuthService,
    private routerService: RouterService,
    private router: Router
  ) {
    this.changeColorIfRouteChange();
  }

  async logOut() {
    this.authService.logout();
    await this.routerService.goToSignIn();
  }

  goTo(link: string) {
    this.routerService.goTo(link);
  }

  private changeColorIfRouteChange() {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.changeColorTo(this.getCurrentLinkActive());
      }
    });
  }

  private changeColorTo(link: any) {
    this.currentLink = link;
  }

  private getCurrentLinkActive() {
    const options: IsActiveMatchOptions = {
      matrixParams: 'ignored',
      queryParams: 'ignored',
      paths: 'subset',
      fragment: 'ignored',
    };

    const links = [...this.navLinks];
    const currentLink = links.find((link) => this.router.isActive(`${link.link}`, options));
    return currentLink;
  }
}
