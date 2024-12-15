import { Component, OnInit } from '@angular/core';
import { SiteTitleComponent } from '../../../../../shared/site-title/site-title.component';
import { ActiveSlideNavService } from '../../active-slide-nav.service';
import { CommonModule } from '@angular/common';
import { ScSearchBarComponent } from '../../slide-content/sc-search-bar/sc-search-bar.component';
import { ScAccountComponent } from '../../slide-content/sc-account/sc-account.component';
import { ScNewComponent } from '../../slide-content/sc-new/sc-new.component';

@Component({
  selector: 'app-nav-top-home-sm',
  standalone: true,
  imports: [SiteTitleComponent, CommonModule, ScSearchBarComponent, ScAccountComponent, ScNewComponent],
  templateUrl: './nav-top-home-sm.component.html',
  styleUrl: './nav-top-home-sm.component.css'
})
export class NavTopHomeSmComponent implements OnInit {
  activeSlide: string | null = null;

  constructor(private activeSlideService: ActiveSlideNavService) {}

  ngOnInit(): void {
    this.activeSlideService.getActiveSlide().subscribe((content) => {
      this.activeSlide = content;
    });
  }

  toggleSlide(newContent: string): void {
    const newSlideContent = this.activeSlide === newContent ? null : newContent;
    this.activeSlideService.setActiveSlide(newSlideContent);
  }
}