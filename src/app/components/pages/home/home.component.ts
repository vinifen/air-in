import { Component } from '@angular/core';
import { SidenavLgComponent } from './nav-home/sidenav-lg/sidenav-lg.component';
import { MainHomeComponent } from './main-home/main-home.component';
import { NavTopSmComponent } from './nav-home/nav-sm/nav-top-sm/nav-top-sm.component';
import { NavBottomSmComponent } from './nav-home/nav-sm/nav-bottom-sm/nav-bottom-sm.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SidenavLgComponent, 
    MainHomeComponent,
    NavTopSmComponent,
    NavBottomSmComponent, 
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
