import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiteTitleComponent } from '../../../../../shared/components/site-title/site-title.component';
import { ActiveSlideNavService } from '../../active-slide-nav.service';
import { SlideNavBottomComponent } from '../slide-nav-bottom/slide-nav-bottom.component';

@Component({
  selector: 'app-nav-bottom-home-sm',
  standalone: true,
  imports: [SiteTitleComponent, SlideNavBottomComponent, CommonModule],
  templateUrl: './nav-bottom-home-sm.component.html',
  // styleUrl: './nav-bottom-home-sm.component.css'
})
export class NavBottomHomeSmComponent implements OnInit {
  @Output() activeSlideChange = new EventEmitter<string | null>();

  activeSlide$: string | null = null;
  

  constructor(private activeSlideService$: ActiveSlideNavService){}

  ngOnInit(): void {
    this.activeSlideService$.getActiveSlide().subscribe((content) =>{
      this.activeSlide$ = content;
      this.activeSlideChange.emit(this.activeSlide$); 
    })
  }

  toggleSlide(newContent: string): void {
    this.activeSlideService$.setActiveSlide(this.activeSlide$ === newContent ? null : newContent);
  }
}
