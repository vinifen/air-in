import { Component } from '@angular/core';
import { SidenavLgComponent } from '../nav/sidenav-lg/sidenav-lg.component';
import { MainComponent } from '../main/main.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SidenavLgComponent, MainComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
