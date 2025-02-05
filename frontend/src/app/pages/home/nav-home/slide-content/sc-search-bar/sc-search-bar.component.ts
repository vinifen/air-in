import { AfterViewInit, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { SearchCitiesService } from '../../../search-cities.service';

@Component({
  selector: 'app-sc-search-bar',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './sc-search-bar.component.html',
  // styleUrl: './sc-search-bar.component.css'
})
export class ScSearchBarComponent implements OnInit {
  inputValue: string = '';

  constructor(private searchCitiesService: SearchCitiesService) {}

  ngOnInit(): void {}

  sendInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value;

    this.searchCitiesService.setCitiesSearched(value);
  }
}
