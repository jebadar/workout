import { TestBed, inject } from '@angular/core/testing';

import { WTemplateService } from './w-template.service';

describe('WTemplateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WTemplateService]
    });
  });

  it('should be created', inject([WTemplateService], (service: WTemplateService) => {
    expect(service).toBeTruthy();
  }));
});
