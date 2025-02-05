import { Component, OnInit } from '@angular/core';
import { MainAuthComponent } from './main-auth/main-auth.component';
import { SidenavAuthLgComponent } from './nav-auth/sidenav-auth-lg/sidenav-auth-lg.component';
import { NavTopAuthSmComponent } from './nav-auth/nav-sm/nav-top-auth-sm/nav-top-auth-sm.component';
import { NavBottomAuthSmComponent } from './nav-auth/nav-sm/nav-bottom-auth-sm/nav-bottom-auth-sm.component';
import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, MainAuthComponent, NavBottomAuthSmComponent, SidenavAuthLgComponent, NavTopAuthSmComponent],
  templateUrl: './auth.component.html',
  // styleUrl: './auth.component.css'
})
export class AuthComponent implements OnInit {
  isLgScreen: boolean = false;

  constructor(private breakpointObserver: BreakpointObserver){}

  ngOnInit(): void {
    this.breakpointObserver.observe(['(min-width: 1024px)']).subscribe((result) => {
      this.isLgScreen = result.matches;
    });
  }
}
