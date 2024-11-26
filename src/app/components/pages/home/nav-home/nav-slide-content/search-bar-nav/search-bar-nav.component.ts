import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-search-bar-nav',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar-nav.component.html',
  styleUrl: './search-bar-nav.component.css'
})
export class SearchBarNavComponent implements OnInit{
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
