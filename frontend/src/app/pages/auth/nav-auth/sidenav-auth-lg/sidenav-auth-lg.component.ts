import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SiteTitleComponent } from '../../../../shared/components/site-title/site-title.component';
import { ActiveContentAuthNavService } from '../../active-content-auth-nav.service';
@Component({
  selector: 'app-sidenav-auth-lg',
  standalone: true,
  imports: [RouterLink, CommonModule, SiteTitleComponent],
  templateUrl: './sidenav-auth-lg.component.html',
  // styleUrl: './sidenav-auth-lg.component.css'
})
export class SidenavAuthLgComponent implements OnInit{
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
