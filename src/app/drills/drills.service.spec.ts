import { TestBed, inject } from '@angular/core/testing';

import { DrillsService } from './drills.service';

describe('DrillsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DrillsService]
    });
  });

  it('should be created', inject([DrillsService], (service: DrillsService) => {
    expect(service).toBeTruthy();
  }));
});
