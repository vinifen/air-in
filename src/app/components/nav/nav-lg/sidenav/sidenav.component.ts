import { Component } from '@angular/core';
import { SiteTitleComponent } from '../../../site-title/site-title.component';
import { SearchSlideComponent } from '../section-slide/search-slide/search-slide.component';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [SiteTitleComponent, RouterLink, SearchSlideComponent, CommonModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent {
  isSearchSlideVisible: boolean = false;
}
