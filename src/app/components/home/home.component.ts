import { Component } from '@angular/core';
import { SidenavComponent } from '../nav/nav-lg/sidenav/sidenav.component';
import { MainComponent } from '../main/main.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SidenavComponent, MainComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
