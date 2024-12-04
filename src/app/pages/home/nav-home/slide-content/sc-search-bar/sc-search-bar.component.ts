import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sc-search-bar',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './sc-search-bar.component.html',
  styleUrl: './sc-search-bar.component.css'
})
export class ScSearchBarComponent {
  inputValue: string = '';
  formResult: string = 'Result here';
  inputValidation: boolean = false;
  isSubmit: boolean = false;

  ngOnInit() {
    const savedValue = sessionStorage.getItem('searchInput');
    if (savedValue) {
      this.inputValue = savedValue; 
    }
  }

  saveInputValue(value: string) {
    if(this.inputValue.match(/^[^/*-_]+$/)){
      this.inputValidation = true;
    }

    this.inputValue = value;
    sessionStorage.setItem('searchInput', this.inputValue);
  }

  onSubmit(){
    this.isSubmit = true;
    this.formResult = this.inputValue;
    localStorage.setItem('searchInput', this.inputValue);

    setTimeout(() => {
      this.isSubmit = false; 
    }, 2000);
  }
}
