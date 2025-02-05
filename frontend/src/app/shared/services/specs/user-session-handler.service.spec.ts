import { TestBed } from '@angular/core/testing';

import { UserSessionHandlerService } from '../user-session-handler.service';

describe('UserSessionHandlerService', () => {
  let service: UserSessionHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserSessionHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
