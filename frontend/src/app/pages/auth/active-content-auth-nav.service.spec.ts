import { TestBed } from '@angular/core/testing';

import { ActiveContentAuthNavService } from './active-content-auth-nav.service';

describe('ActiveContentAuthNavService', () => {
  let service: ActiveContentAuthNavService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActiveContentAuthNavService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
