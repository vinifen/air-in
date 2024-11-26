import { Component } from '@angular/core';
import { MainHomeComponent } from './main-home/main-home.component';
import { NavBottomHomeSmComponent } from './nav-home/nav-sm/nav-bottom-home-sm/nav-bottom-home-sm.component';
import { NavTopHomeSmComponent } from './nav-home/nav-sm/nav-top-home-sm/nav-top-home-sm.component';
import { SidenavHomeLgComponent } from './nav-home/nav-lg/sidenav-home-lg/sidenav-home-lg.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MainHomeComponent, SidenavHomeLgComponent, NavBottomHomeSmComponent, NavTopHomeSmComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
