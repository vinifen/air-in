import { TestBed } from '@angular/core/testing';

import { CitiesWSessionHandlerService } from '../cities-w-session-handler.service';

describe('CitiesWSessionHandlerService', () => {
  let service: CitiesWSessionHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CitiesWSessionHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
