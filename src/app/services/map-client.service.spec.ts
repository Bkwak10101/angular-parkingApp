import { TestBed } from '@angular/core/testing';

import { MapClientService } from './map-client.service';

describe('MapClientService', () => {
  let service: MapClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
