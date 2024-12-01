import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sc-search-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './sc-search-bar.component.html',
  styleUrl: './sc-search-bar.component.css'
})
export class ScSearchBarComponent {
  inputValue: string = '';

  ngOnInit() {
    const savedValue = sessionStorage.getItem('searchInput');
    if (savedValue) {
      this.inputValue = savedValue; 
    }
  }

  saveInputValue(value: string) {
    this.inputValue = value;
    sessionStorage.setItem('searchInput', this.inputValue);
  }
}
