import { NgComponentOutlet, CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ScAccountComponent } from '../../slide-content/sc-account/sc-account.component';
import { ScSearchBarComponent } from '../../slide-content/sc-search-bar/sc-search-bar.component';

@Component({
  selector: 'app-slide-nav-bottom',
  standalone: true,
  imports: [
    ScAccountComponent,
    ScSearchBarComponent, 
    NgComponentOutlet,
    CommonModule,
  ],
  templateUrl: './slide-nav-bottom.component.html',
  styleUrl: './slide-nav-bottom.component.css'
})
export class SlideNavBottomComponent {
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
