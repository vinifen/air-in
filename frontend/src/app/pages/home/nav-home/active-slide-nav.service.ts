import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActiveSlideNavService {
  private activeSlide$ = new BehaviorSubject<string | null>('');

  setActiveSlide(content: string | null){
    this.activeSlide$.next(content);
  }

  getActiveSlide(){
    return this.activeSlide$.asObservable();
  }
}
