import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SlideSidenavComponent } from '../slide-sidenav/slide-sidenav.component';
import { SiteTitleComponent } from '../../../../../shared/components/site-title/site-title.component';
import { CommonModule } from '@angular/common';
import { ActiveSlideNavService } from '../../active-slide-nav.service';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../../../shared/services/auth.service';

@Component({
  selector: 'app-sidenav-home-lg',
  standalone: true,
  imports: [RouterLink, SlideSidenavComponent, SiteTitleComponent, CommonModule],
  templateUrl: './sidenav-home-lg.component.html',
  // styleUrl: './sidenav-home-lg.component.css'
})
export class SidenavHomeLgComponent implements OnInit {
  @Output() activeSlideChange = new EventEmitter<string | null>();

  activeSlide$: string | null = null;
  

  constructor(
    private activeSlideService$: ActiveSlideNavService,
    private authService: AuthService
  ){}

  ngOnInit(): void {
    this.activeSlideService$.getActiveSlide().subscribe((content) =>{
      this.activeSlide$ = content;
      this.activeSlideChange.emit(this.activeSlide$); 
    })
  }

  toggleSlide(newContent: string): void {
    this.authService.getIsLogged().subscribe({next: (value: boolean) => {
      if(value == false && newContent === "account"){
        return
      }
      this.activeSlideService$.setActiveSlide(this.activeSlide$ === newContent ? null : newContent);
    }});
  }
}
