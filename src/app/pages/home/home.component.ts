import { Component, OnInit } from '@angular/core';
import { MainHomeComponent } from './main-home/main-home.component';
import { NavBottomHomeSmComponent } from './nav-home/nav-sm/nav-bottom-home-sm/nav-bottom-home-sm.component';
import { NavTopHomeSmComponent } from './nav-home/nav-sm/nav-top-home-sm/nav-top-home-sm.component';
import { SidenavHomeLgComponent } from './nav-home/nav-lg/sidenav-home-lg/sidenav-home-lg.component';
import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MainHomeComponent, SidenavHomeLgComponent, NavBottomHomeSmComponent, NavTopHomeSmComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  isLgScreen: boolean = false;

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.breakpointObserver.observe(['(min-width: 1024px)']).subscribe((result) => {
      this.isLgScreen = result.matches;
    });
  }
}
