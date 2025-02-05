import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../../shared/services/auth.service';
import { firstValueFrom } from 'rxjs';
import { CitiesWSessionHandlerService } from '../../../../../shared/services/cities-w-session-handler.service';
import { TitleContentService } from '../../title-content.service';
import { AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-sc-new',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sc-new.component.html',
  // styleUrl: './sc-new.component.css'
})
export class ScNewComponent implements OnInit{

  inputNewCity: string = "";
  errorMessage = "";
  successMessage = "";

  constructor(
    private titleContentServe: TitleContentService,
    private authService: AuthService,
    private citiesWHandler: CitiesWSessionHandlerService
  ) {}

  ngOnInit(): void {
    this.titleContentServe.setTitleContent("Add new City")
  }

  async onSubmit() {
    this.errorMessage = ""; 
    this.successMessage = ""; 
  
    if (!this.inputNewCity.trim()) {
      this.errorMessage = "City name cannot be empty.";
      return;
    }
  
    const cityArray = [this.inputNewCity.trim()];
  
    try {
      const isLogged = await firstValueFrom(this.authService.getIsLogged());
  
      if (isLogged) {
        const resultPost = await this.citiesWHandler.postCitiesWeather(cityArray);
  
        if (resultPost.status) {
          this.successMessage = "City added successfully!";
        } else {
          this.errorMessage = resultPost.message || "Failed to add the city.";
        }

      } else {
        const resultPostPublic = await this.citiesWHandler.postCitiesWeatherPublic(cityArray);
  
        if (resultPostPublic.status) {
          this.successMessage = resultPostPublic.message || "City added successfully (public mode)!";
        } else {
          this.errorMessage = resultPostPublic.message || "Failed to add the city (public).";
        }
      }
    } catch (error: any) {
      this.errorMessage = error.message || "An unexpected error occurred. Please try again.";
    } finally {
      this.inputNewCity = ""; 
    }
  }
  
}
