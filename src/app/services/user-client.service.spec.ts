import { TestBed } from '@angular/core/testing';

import { UserClientService } from './user-client.service';

describe('UserServiceService', () => {
  let service: UserClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
