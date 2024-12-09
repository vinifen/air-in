import { Component, Input } from '@angular/core';
import { ScAccountComponent } from '../../slide-content/sc-account/sc-account.component';
import { ScCreditsComponent } from '../../slide-content/sc-credits/sc-credits.component';
import { ScNewComponent } from '../../slide-content/sc-new/sc-new.component';
import { ScSearchBarComponent } from '../../slide-content/sc-search-bar/sc-search-bar.component';
import { ScSettingsComponent } from '../../slide-content/sc-settings/sc-settings.component';
import { NgComponentOutlet, CommonModule } from '@angular/common';

@Component({
  selector: 'app-slide-sidenav',
  standalone: true,
  imports: [
    ScAccountComponent,
    ScCreditsComponent, 
    ScNewComponent, 
    ScSearchBarComponent, 
    ScSettingsComponent,
    NgComponentOutlet,
    CommonModule,
  ],
  templateUrl: './slide-sidenav.component.html',
  styleUrl: './slide-sidenav.component.css'
})
export class SlideSidenavComponent {
  @Input() activeSlide: string | null = null;
  constructor(){
    console.log(this.activeSlide);
  }
  getComponent(){
    switch(this.activeSlide){
      case 'account':
        return ScAccountComponent;
      case 'search-bar':
        return ScSearchBarComponent;
      case 'new':
        return ScNewComponent;
      case 'settings':
        return ScSettingsComponent; 
      case 'credits':
        return ScCreditsComponent;
      default:
        return null;
    }
  }

}
