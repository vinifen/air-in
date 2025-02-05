import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SiteTitleComponent } from '../../../../../shared/components/site-title/site-title.component';
import { ActiveContentAuthNavService } from '../../../active-content-auth-nav.service';

@Component({
  selector: 'app-nav-top-auth-sm',
  standalone: true,
  imports: [RouterLink, CommonModule, SiteTitleComponent],
  templateUrl: './nav-top-auth-sm.component.html',
  // styleUrl: './nav-top-auth-sm.component.css'
})
export class NavTopAuthSmComponent implements OnInit {
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