import { Component, OnInit } from '@angular/core';
import { ActiveContentAuthNavService } from '../../../active-content-auth-nav.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SiteTitleComponent } from '../../../../../shared/components/site-title/site-title.component';

@Component({
  selector: 'app-nav-bottom-auth-sm',
  standalone: true,
  imports: [RouterLink, CommonModule, SiteTitleComponent],
  templateUrl: './nav-bottom-auth-sm.component.html',
  // styleUrl: './nav-bottom-auth-sm.component.css'
})
export class NavBottomAuthSmComponent implements OnInit {
  activeContent: string | null = null;
  
  constructor(private activeContentService$: ActiveContentAuthNavService){}

  ngOnInit(): void {
    this.activeContentService$.setActiveContent("login");
    this.activeContentService$.getActiveContent().subscribe((content) =>{
      this.activeContent = content;
    })
  }

  toggleContent(newContent: string){
    if(this.activeContent == newContent){
      return;
    }
    this.activeContentService$.setActiveContent(newContent);
  }
}