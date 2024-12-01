import { Component, OnInit } from '@angular/core';
import { ApiWeatherService } from '../../../shared/services/api-weather.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main-home.component.html',
  styleUrls: ['./main-home.component.css'] // Corrigido: styleUrl -> styleUrls
})
export class MainHomeComponent implements OnInit {

  weatherData: any;

  constructor(private apiWeatherService: ApiWeatherService) {}

  async ngOnInit(): Promise<any> {
    try {
      this.weatherData = await this.apiWeatherService.getWeather('Curitiba')
    } catch (error) {
      console.error("error", error);
    }
  }
}
