import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchCitiesService } from '../../search-cities.service';
import { DeleteCitiesWModeService } from '../../delete-cities-w-mode.service';
import { CitiesWeatherService } from '../../../../shared/services/cities-weather.service';

@Component({
  selector: 'app-cities-w-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cities-w-cards.component.html',
})
export class CitiesWCardsComponent implements OnInit, OnChanges {
  @Input() weatherData$!: any;
  @Input() activeSlide$!: string | null;
  @Output() emitWeatherData$ = new EventEmitter<any>();

  renderCardsData: any = [];
  isDeleteCitiesWModeOn$: boolean = false;
  citiesToDelete: string[] = [];
  citiesSearched$: string[] = [];
  promptSearchCities$: string = "";

  constructor(
    private deleteCitiesWService: DeleteCitiesWModeService,
    private searchCitiesService: SearchCitiesService,
    private citiesWeatherService: CitiesWeatherService,
  ) {}

  ngOnInit(): void {
    this.searchCitiesService.getCitiesSearched().subscribe({
      next: (prompt) => {
        this.promptSearchCities$ = prompt;
        this.updateRenderCards();
      },
    });

    this.deleteCitiesWService.getIsDeleteCitiesW().subscribe({
      next: (value) => {
        this.isDeleteCitiesWModeOn$ = value;
      },
    });

    this.citiesWeatherService.getCitiesData().subscribe({
      next: (value) => {
        this.weatherData$ = value;
        this.emitWeatherData$.emit(value);
        this.updateRenderCards();
      },
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['activeSlide$'] && this.activeSlide$ === "search-bar") {
      this.updateRenderCards();
    }
  }

  private updateRenderCards(): void {
    if(this.promptSearchCities$ === ""){
      this.renderCardsData = this.weatherData$;
    }else if (this.activeSlide$ === "search-bar") {
      this.citiesSearched$ = this.weatherData$.filter((item: any) =>
        item.content.name.toLowerCase().includes(this.promptSearchCities$.toLowerCase())
      );
      this.renderCardsData = this.citiesSearched$;
    } else {
      this.renderCardsData = this.weatherData$;
    }
  }

  selectCitiesToDelete(cityName: string): void {
    const index = this.citiesToDelete.indexOf(cityName);
    if (index === -1) {
      this.citiesToDelete.push(cityName);
    } else {
      this.citiesToDelete.splice(index, 1);
    }
    this.deleteCitiesWService.setCitiesToDelete(this.citiesToDelete);
  }
}
