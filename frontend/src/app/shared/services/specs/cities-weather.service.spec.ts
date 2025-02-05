import { TestBed } from '@angular/core/testing';

import { CitiesWeatherService } from '../cities-weather.service';

describe('CitiesWeatherService', () => {
  let service: CitiesWeatherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CitiesWeatherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
