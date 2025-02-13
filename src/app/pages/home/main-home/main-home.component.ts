import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../shared/services/auth.service';
import { CitiesWSessionHandlerService } from '../../../shared/services/cities-w-session-handler.service';
import { ActiveSlideNavService } from '../nav-home/active-slide-nav.service';
import { DeleteCitiesWModeService } from '../delete-cities-w-mode.service';
import { InitializeService } from '../../../shared/services/initialize.service';
import { CitiesWCardsComponent } from './cities-w-cards/cities-w-cards.component';



@Component({
  selector: 'app-main-home',
  standalone: true,
  imports: [CommonModule, CitiesWCardsComponent],
  templateUrl: './main-home.component.html',
  // styleUrl: './main-home.component.css' 
})
export class MainHomeComponent implements OnInit{
  islogged$: boolean = false;
  weatherData$: any;
  userdata: any;
  activeSlide$: string | null = null;
  isDeleteCitiesWModeOn$: boolean = false;
  citiesToDelete: string[] = [];
  isInitialized$: boolean = false;
  citiesSearched: string[] = [];

  constructor(
    private authService: AuthService, 
    private activeSlideService: ActiveSlideNavService,
    private citiesWHandler: CitiesWSessionHandlerService, 
    private deleteCitiesWService: DeleteCitiesWModeService,
    private initializeService: InitializeService,

  ) {}

  async ngOnInit(){
    this.initializeService.getIsInitialized().subscribe({
      next: (value) => {
        this.isInitialized$ = value;
      }
    });

    this.activeSlideService.getActiveSlide().subscribe({
      next: (value)=>{
        this.activeSlide$ = value;
      } 
    });

    this.authService.getIsLogged().subscribe({
      next: (value: boolean) => {
        this.islogged$ = value;
      }
    });

    this.citiesWHandler.checkCities();

    this.deleteCitiesWService.getCitiesToDelete().subscribe({
      next: (value) => {this.citiesToDelete = value}
    });

  }

  setLocalWeatherData(event: any){
    this.weatherData$ = event;
  }

  changeActiveSlideToNew(){
    this.activeSlideService.setActiveSlide(this.activeSlide$ === "new" ? null : "new");
  }
}
