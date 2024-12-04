import { Component, EventEmitter, Output } from '@angular/core';
import { SlideSidenavComponent } from '../slide-sidenav/slide-sidenav.component';
import { SiteTitleComponent } from '../../../../../shared/site-title/site-title.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidenav-home-lg',
  standalone: true,
  imports: [SlideSidenavComponent, SiteTitleComponent, CommonModule],
  templateUrl: './sidenav-home-lg.component.html',
  styleUrl: './sidenav-home-lg.component.css'
})
export class SidenavHomeLgComponent {
  @Output() activeSlideChange = new EventEmitter<string | null>();

  activeSlide: string | null = null;

  toggleSlide(slide: string): void {
    this.activeSlide = this.activeSlide === slide ? null : slide;
    this.activeSlideChange.emit(this.activeSlide); 
  }
}
