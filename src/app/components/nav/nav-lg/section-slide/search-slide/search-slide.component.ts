import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-slide',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-slide.component.html',
  styleUrls: ['./search-slide.component.css']
})
export class SearchSlideComponent implements OnInit {
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
