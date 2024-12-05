import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiWeatherService {
  apiURL: string = environment.weatherApiURL;
  apiKey: string = environment.weatherApiKey;

  constructor(private http: HttpClient) {}

  getWeather(city: string): Observable<any>{
    const data = this.http.get(`${this.apiURL}data/2.5/weather?q=${city}&appid=${this.apiKey}&units=metric`)
    
    this.saveWeatherData(data);
    return data;
  }

  saveWeatherData(data: any): Observable<any> {
    return this.http.post('http://localhost:3000/weather', data); 
  }
}
