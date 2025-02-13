import { AfterViewInit, Component, ElementRef, inject, OnDestroy, ViewChild } from '@angular/core';
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
export class ScSearchBarComponent implements OnDestroy{
  inputValue: string = '';

  constructor(private searchCitiesService: SearchCitiesService) {}

  sendInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value;

    this.searchCitiesService.setCitiesSearched(value);
  }

  ngOnDestroy(): void {
    this.searchCitiesService.setCitiesSearched('');
  }

}
