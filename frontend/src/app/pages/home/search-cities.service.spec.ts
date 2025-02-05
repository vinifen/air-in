import { TestBed } from '@angular/core/testing';

import { SearchCitiesService } from './search-cities.service';

describe('SearchCitiesService', () => {
  let service: SearchCitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchCitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
