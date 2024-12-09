import { Component, Output, Input, EventEmitter } from '@angular/core';
import { SlideNavTopComponent } from '../slide-nav-top/slide-nav-top.component';
import { SiteTitleComponent } from '../../../../../shared/site-title/site-title.component';
import { ActiveSlideNavService } from '../../active-slide-nav.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-top-home-sm',
  standalone: true,
  imports: [SiteTitleComponent, SlideNavTopComponent, CommonModule],
  templateUrl: './nav-top-home-sm.component.html',
  styleUrl: './nav-top-home-sm.component.css'
})
export class NavTopHomeSmComponent {
  @Output() activeSlideChange = new EventEmitter<string | null>();

  activeSlide: string | null = null;
  activeSlideService: ActiveSlideNavService;

  constructor(service: ActiveSlideNavService){
    this.activeSlideService = service;
    this.activeSlide = this.activeSlideService.getActiveSlide();
  }

  toggleSlide(slide: string): void {
    this.activeSlideService.setActiveSlide(this.activeSlide === slide ? null : slide);
    this.activeSlide = this.activeSlideService.getActiveSlide();
    this.activeSlideChange.emit(this.activeSlide); 
  }
}
