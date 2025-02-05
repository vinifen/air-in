import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import ICitiesData from '../interfaces/ICitiesData';

@Injectable({
  providedIn: 'root'
})
export class CitiesWeatherService {
  private citiesData$: BehaviorSubject<ICitiesData[] | null> = new BehaviorSubject<ICitiesData[] | null>(null);
  private apiURL: string = environment.backendURL;
 

  constructor(private http: HttpClient) {}

  setCitiesData(newCitiesData: ICitiesData[] | null){
    if(newCitiesData){
      this.citiesData$.next(newCitiesData);
    }else{ 
      this.citiesData$.next(null);
    }
  }
  
  getCitiesData(): Observable<ICitiesData[] | null>{
    return this.citiesData$.asObservable();
  }

  requestPostCitiesWeather(cityNames: string[]) {
    return this.http.post(`${this.apiURL}cities-weather`, {cities: cityNames}, {withCredentials: true}).pipe(take(1));
  }

  requestCitiesWeather(): Observable<ICitiesData[]> {
    return this.http.get<{data: ICitiesData[], status: boolean}>(`${this.apiURL}cities-weather`, {withCredentials: true}).pipe(
      take(1),
      map((citiesResult) => citiesResult.data)
    );
  }

  requestCitiesWeatherPublic(cityNames: string[]) {
    return this.http.post(`${this.apiURL}cities-weather/public`, cityNames).pipe(take(1));
  }

  deleteCities(cities: string[]){
    const data = this.http.delete<{ status: boolean; data: any }>(
      `${this.apiURL}cities-weather`, 
      { 
        body: { cities }, 
        withCredentials: true 
      }
    ).pipe(take(1));
    
    return data;
  }
}
