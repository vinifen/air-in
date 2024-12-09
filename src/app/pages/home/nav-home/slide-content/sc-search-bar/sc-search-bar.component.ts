import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SearchBarNavValueService } from '../../search-bar-nav-value.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-sc-search-bar',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './sc-search-bar.component.html',
  styleUrl: './sc-search-bar.component.css'
})
export class ScSearchBarComponent implements OnInit {
  inputValue: string = '';
  formResult: string = 'Result here';
  inputValidation: boolean = false;
  isSubmit: boolean = false;
  searchValueService$: SearchBarNavValueService;

  constructor(service: SearchBarNavValueService){
    this.searchValueService$ = service;
  }

  ngOnInit() {
    this.searchValueService$.getSearchValue().subscribe({
      next: (value) => {
        this.inputValue = value;
      }
    });
  }

  saveInputValue(value: string) {
    if(this.inputValue.match(/^[^/*-_]+$/)){
      this.inputValidation = true;
    }
    this.searchValueService$.setSearchValue(value);
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
