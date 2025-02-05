import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchCitiesService } from '../../search-cities.service';
import { DeleteCitiesWModeService } from '../../delete-cities-w-mode.service';
import { CitiesWeatherService } from '../../../../shared/services/cities-weather.service';

@Component({
  selector: 'app-cities-w-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cities-w-cards.component.html',
  // styleUrl: './cities-w-cards.component.css'
})
export class CitiesWCardsComponent implements OnInit {
  @Input() weatherData$!: any;
  @Input() activeSlide$!: string | null;
  @Output() emitWeatherData$ = new EventEmitter<any>(); 

  renderCardsData: any;
  isDeleteCitiesWModeOn$: boolean = false;;
  citiesToDelete: string[] = [];
  citiesSearched$: string[] = []; 

  constructor(
    private deleteCitiesWService: DeleteCitiesWModeService,
    private serchCitiesService: SearchCitiesService,
    private citiesWeatherService: CitiesWeatherService,
  ){}
  
  ngOnInit(): void {
    this.serchCitiesService.getCitiesSearched().subscribe({
      next: (prompt) => {
        if(prompt != ""){ 
          this.citiesSearched$ = this.weatherData$.filter((item: any) => 
            item.content.name.toLowerCase().includes(prompt.toLowerCase())
          );
          this.renderCardsData = this.citiesSearched$;
        }else{
          this.renderCardsData = this.weatherData$;
        }
        
      },
    });

    this.deleteCitiesWService.getIsDeleteCitiesW().subscribe({
      next: (value) => {
        this.isDeleteCitiesWModeOn$ = value;
      }
    });

    this.citiesWeatherService.getCitiesData().subscribe({
      next: (value) => {
        this.emitWeatherData$.emit(value);
        this.weatherData$ = value;
        this.renderCardsData = this.weatherData$;
      }
    });
  }


  selectCitiesToDelete(cityName: string) {
    if (!this.citiesToDelete.includes(cityName)) {
      this.citiesToDelete.push(cityName);
      this.deleteCitiesWService.setCitiesToDelete(this.citiesToDelete);
    }else{
      this.citiesToDelete = this.citiesToDelete.filter(city => cityName !== city);
    }
  }
}
