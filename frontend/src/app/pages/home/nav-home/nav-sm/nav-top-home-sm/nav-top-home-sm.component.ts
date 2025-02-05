import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SiteTitleComponent } from '../../../../../shared/components/site-title/site-title.component';
import { ActiveSlideNavService } from '../../active-slide-nav.service';
import { CommonModule } from '@angular/common';
import { ScSearchBarComponent } from '../../slide-content/sc-search-bar/sc-search-bar.component';
import { ScAccountComponent } from '../../slide-content/sc-account/sc-account.component';
import { ScNewComponent } from '../../slide-content/sc-new/sc-new.component';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../../../shared/services/auth.service';
import { SlideNavTopComponent } from '../slide-nav-top/slide-nav-top.component';
import { TitleContentService } from '../../title-content.service';
import { UsersService } from '../../../../../shared/services/users.service';
import IUserData from '../../../../../shared/interfaces/IUserData';

@Component({
  selector: 'app-nav-top-home-sm',
  standalone: true,
  imports: [RouterLink, SiteTitleComponent, CommonModule, ScSearchBarComponent, ScAccountComponent, ScNewComponent, SlideNavTopComponent],
  templateUrl: './nav-top-home-sm.component.html',
  // styleUrl: './nav-top-home-sm.component.css'
})
export class NavTopHomeSmComponent implements OnInit {
  activeSlide$: string | null = null;
  titleContent$: string | null = null;
  userData$: IUserData | null = null;
  isLogged$: boolean = false;

  @Output() activeSlideChange = new EventEmitter<string | null>();
  
  constructor(
    private activeSlideService$: ActiveSlideNavService,
    private authService: AuthService,
    private titleContentService: TitleContentService,
    private userService: UsersService
  ) {}

  async ngOnInit() {
    
    this.activeSlideService$.getActiveSlide().subscribe((content) => {
      this.activeSlide$ = content;
      this.activeSlideChange.emit(this.activeSlide$);
    });
  
    this.titleContentService.getTitleContent().subscribe({
      next: (title) => {
        setTimeout(() => {
          this.titleContent$ = title;
        });
      }
    });
    this.userService.getUserData().subscribe({
      next: (value) => {
        this.userData$ = value;
      }
    });

    this.authService.getIsLogged().subscribe({
      next: (value) => {
        this.isLogged$ = value;
      }
    });
    
  }

  toggleSlide(newContent: string): void {
    this.authService.getIsLogged().subscribe({next: (value: boolean) => {
      if(value == false && newContent === "account"){
        return
      }
      this.titleContentService.setTitleContent('');
      this.activeSlideService$.setActiveSlide(this.activeSlide$ === newContent ? null : newContent);
    }});
  }
}