import { Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarNavComponent } from '../../nav-slide-content/search-bar-nav/search-bar-nav.component';

@Component({
  selector: 'app-sidenav-slide',
  standalone: true,
  imports: [CommonModule, SearchBarNavComponent],
  templateUrl: './sidenav-slide.component.html',
  styleUrl: './sidenav-slide.component.css'
})
export class SidenavSlideComponent {
  @Input() dynamicComponent: any;
  @Input() inputValue: string = ''; 
}
