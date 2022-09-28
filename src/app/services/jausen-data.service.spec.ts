import { TestBed } from '@angular/core/testing';

import { JausenDataService } from './jausen-data.service';

describe('JausenDataService', () => {
  let service: JausenDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JausenDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
