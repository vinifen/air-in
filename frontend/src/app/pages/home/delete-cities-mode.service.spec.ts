import { TestBed } from '@angular/core/testing';

import { DeleteCitiesWModeService } from './delete-cities-w-mode.service';

describe('DeleteCitiesWModeService', () => {
  let service: DeleteCitiesWModeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteCitiesWModeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
