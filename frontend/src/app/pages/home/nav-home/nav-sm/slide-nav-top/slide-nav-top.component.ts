import { Component, Input } from '@angular/core';
import { ScAccountComponent } from '../../slide-content/sc-account/sc-account.component';
import { NgComponentOutlet } from '@angular/common';
import { ScNewComponent } from '../../slide-content/sc-new/sc-new.component';


@Component({
  selector: 'app-slide-nav-top',
  standalone: true,
  imports: [ScAccountComponent, ScNewComponent, NgComponentOutlet],
  templateUrl: './slide-nav-top.component.html',
  // styleUrl: './slide-nav-top.component.css'
})
export class SlideNavTopComponent {
 @Input() activeSlide$: string | null = null;

  constructor(){}
  
  getComponent(){
   if(this.activeSlide$ === "account"){
    return ScAccountComponent;
   }
   if(this.activeSlide$ === "new"){
    return ScNewComponent;
   }
   return null;
  }
}
