import { TestBed } from '@angular/core/testing';

import { EventsManagerService } from './events-manager.service';

describe('EventsManagerService', () => {
  let service: EventsManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventsManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
