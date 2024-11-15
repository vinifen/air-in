import { Component } from '@angular/core';
import { SiteTitleComponent } from '../../site-title/site-title.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidenav-lg',
  standalone: true,
  imports: [SiteTitleComponent, RouterLink],
  templateUrl: './sidenav-lg.component.html',
  styleUrl: './sidenav-lg.component.css'
})
export class SidenavLgComponent {

}
