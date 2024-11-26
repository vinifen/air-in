import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarNavComponent } from '../../nav-slide-content/search-bar-nav/search-bar-nav.component';

@Component({
  selector: 'app-search-nav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-nav.component.html',
  styleUrls: ['./search-nav.component.css']
})
export class SearchNavComponent {
  @Output() dynamicComponentChange = new EventEmitter<any>();
  buttonColor: string = 'transparent';  

  public onContentChange(): void { 
    this.dynamicComponentChange.emit(SearchBarNavComponent);
    this.buttonColor = this.buttonColor === 'transparent' ? 'white' : 'transparent';
  }
}
