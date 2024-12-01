import { TestBed } from '@angular/core/testing';

import { ApiWeatherService } from '../api-weather.service';

describe('ApiWeatherService', () => {
  let service: ApiWeatherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiWeatherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
