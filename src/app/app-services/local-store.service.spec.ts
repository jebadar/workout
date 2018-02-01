import { TestBed, inject } from '@angular/core/testing';

import { LocalStoreService } from './local-store.service';

describe('LocalStoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalStoreService]
    });
  });

  it('should be created', inject([LocalStoreService], (service: LocalStoreService) => {
    expect(service).toBeTruthy();
  }));
});
