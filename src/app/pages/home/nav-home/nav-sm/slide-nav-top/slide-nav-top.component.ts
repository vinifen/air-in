import { Component, Input } from '@angular/core';
import { ScAccountComponent } from '../../slide-content/sc-account/sc-account.component';
import { ScCreditsComponent } from '../../slide-content/sc-credits/sc-credits.component';
import { ScNewComponent } from '../../slide-content/sc-new/sc-new.component';
import { ScSearchBarComponent } from '../../slide-content/sc-search-bar/sc-search-bar.component';
import { ScSettingsComponent } from '../../slide-content/sc-settings/sc-settings.component';
import { CommonModule, NgComponentOutlet } from '@angular/common';

@Component({
  selector: 'app-slide-nav-top',
  standalone: true,
  imports: [
    ScAccountComponent,
    ScSearchBarComponent, 
    NgComponentOutlet,
    CommonModule,
  ],
  templateUrl: './slide-nav-top.component.html',
  styleUrl: './slide-nav-top.component.css'
})
export class SlideNavTopComponent {
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
      default:
        return null;
    }
  }
}
