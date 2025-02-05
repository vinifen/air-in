import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import ICitiesData from '../interfaces/ICitiesData';
import { AuthService } from './auth.service';
import { CitiesWeatherService } from './cities-weather.service';

@Injectable({
  providedIn: 'root'
})
export class CitiesWSessionHandlerService {
  constructor(
    private authService: AuthService, 
    private citiesWeatherService: CitiesWeatherService, 
  ) {}


  async checkCities(): Promise<void> {
    try {
      const isLogged = await firstValueFrom(this.authService.getIsLogged());
      if (isLogged) {
        const data: ICitiesData[] = await firstValueFrom(this.citiesWeatherService.requestCitiesWeather());
        this.citiesWeatherService.setCitiesData(data);
      }
    } catch (error) {
      console.error('Error checking cities:', error);
      throw error;
    }
  }
  

  postCitiesWeather(cities: string[]): Promise<{ status: boolean; message: string }> {
    return new Promise((resolve, reject) => {
      this.citiesWeatherService.requestPostCitiesWeather(cities).subscribe({
        next: async (newCities: any) => {
          try {
            const filteredNewCities = await this.removeInvalidCitiesW(newCities.data);
  
            if (filteredNewCities.status && filteredNewCities.data) {
              const updatedData = await this.updatedCitiesWeatherData(filteredNewCities.data);
  
              if (updatedData) {
                this.citiesWeatherService.setCitiesData(updatedData);
                resolve({ status: true, message: newCities.message || "Success" });
              }
            } else {
        
              resolve({ status: false, message: newCities.message || "Failed to process cities." });
            }
          } catch (error) {
            console.error("Error processing the cities:", error);
      
            reject({ status: false, message: newCities.message || "An error occurred while processing cities." });
          }
        },
        error: (err) => {
          console.error("Error in the request to postCitiesWeather:", err);
    
          reject({ status: false, message: err.error?.message || "Failed to request cities weather data." });
        }
      });
    });
  }
  
  postCitiesWeatherPublic(cities: string[]): Promise<{ status: boolean; message: string }> {
    return new Promise((resolve, reject) => {
      this.citiesWeatherService.requestCitiesWeatherPublic(cities).subscribe({
        next: async (newCities: any) => {
          try {
            const filteredNewCities = await this.removeInvalidCitiesW(newCities.data);
  
            if (filteredNewCities.status && filteredNewCities.data) {
              const updatedData = await this.updatedCitiesWeatherData(filteredNewCities.data);
  
              if (updatedData) {
                this.citiesWeatherService.setCitiesData(updatedData);
                resolve({ status: true, message: newCities.message || "Success" });
              }
            } else {
        
              resolve({ status: false, message: newCities.message || "Failed to process public cities." });
            }
          } catch (error) {
            console.error("Erro ao atualizar os dados:", error);
            reject({ status: false, message: newCities.message || "An error occurred while processing public cities." });
          }
        },
        error: (err) => {
    
          console.error("Error in the request to postCitiesWeatherPublic:", err);
          reject({ status: false, message: err.error?.message || "Failed to request public cities weather data." });
        }
      });
    });
  }
  


  private async removeInvalidCitiesW(cities: ICitiesData[] ){
    const filteredCities = cities.filter(cities => !!cities.status);

    if(filteredCities.length == 0){
      if(cities.length === 1){
  
        return { status: false, message:  "This city has already with error", data: filteredCities}
      }   

      return { status: false, message: "All cities have now with error", data: filteredCities}
    }

    if(filteredCities.length < cities.length){

      return { status: true, message: "One or more cities have already with error.", data: filteredCities}
    }
    if(cities.length === 1){   

      return {status: true, data: filteredCities, message: "City successfully."};
    }
    return {status: true, data: filteredCities, message: "All cities successfully."};
  }
  

  private async updatedCitiesWeatherData(newCities: ICitiesData[]){
    if(!newCities){

      return null;
    }
    const existingData: ICitiesData[] | null = await firstValueFrom(this.citiesWeatherService.getCitiesData());
  
    let updatedData: ICitiesData[];
    if (existingData) {
      updatedData = [...existingData, ...newCities];
    } else {
      updatedData = [...newCities];
    }
    return updatedData;
  }
  
}
