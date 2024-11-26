import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavSlideComponent } from './sidenav-slide/sidenav-slide.component';
import { SiteTitleComponent } from '../../../../site-title/site-title.component';
import { ProfileNavComponent } from '../nav-buttons/profile-nav/profile-nav.component';
import { SearchNavComponent } from '../nav-buttons/search-nav/search-nav.component';
import { NewCityComponent } from '../nav-buttons/new-city/new-city.component';
import { ConfigNavComponent } from '../nav-buttons/config-nav/config-nav.component';
import { CreditsComponent } from '../nav-buttons/credits/credits.component';

@Component({
  selector: 'app-sidenav-lg',
  standalone: true,
  imports: [
    CommonModule,
    SidenavSlideComponent,
    SiteTitleComponent,
    ProfileNavComponent,
    SearchNavComponent,
    NewCityComponent,
    ConfigNavComponent,
    CreditsComponent,
  ],
  templateUrl: './sidenav-lg.component.html',
  styleUrls: ['./sidenav-lg.component.css']
})
export class SidenavLgComponent {
  isSlideVisible: boolean = false;
  dynamicComponent: any = null;

  public updateDynamicComponent(component: any): void {
    this.dynamicComponent = component;
  }
}
