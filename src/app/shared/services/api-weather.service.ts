import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiWeatherService {
  apiURL: string = environment.weatherApiURL;
  apiKey: string = environment.weatherApiKey;

  constructor(private http: HttpClient) {}

  async getWeather(city: string){
    const data = this.http.get(`${this.apiURL}data/2.5/weather?q=${city}&appid=${this.apiKey}&units=metric`)
    const response = await firstValueFrom(data);
    this.saveWeatherData(response);
    return response;
  }

  saveWeatherData(data: any) {
    firstValueFrom(this.http.post('http://localhost:3000/weather', data)); 
  }
}
