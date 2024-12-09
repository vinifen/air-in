import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ActiveSlideNavService {
  activeSlide: string | null = null;

  setActiveSlide(content: string | null){
   
    this.activeSlide = content;
    console.log(this.activeSlide, content);
  }

  getActiveSlide(){
    return this.activeSlide;
  }
}
