import { NgComponentOutlet, CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ScSettingsComponent } from '../../slide-content/sc-settings/sc-settings.component';
import { ScCreditsComponent } from '../../slide-content/sc-credits/sc-credits.component';

@Component({
  selector: 'app-slide-nav-bottom',
  standalone: true,
  imports: [
    ScSettingsComponent,
    ScCreditsComponent,
    NgComponentOutlet,
    CommonModule,
  ],
  templateUrl: './slide-nav-bottom.component.html',
  // styleUrl: './slide-nav-bottom.component.css'
})
export class SlideNavBottomComponent {
  @Input() activeSlide$: string | null = null;
  constructor(){}
  
  getComponent(){
    switch(this.activeSlide$){
      case 'settings':
        return ScSettingsComponent;
      case 'credits':
        return ScCreditsComponent;
      default:
        return null;
    }
  }
}
