import { TestBed, inject } from '@angular/core/testing';

import { ApiBaseUrlService } from './api-base-url.service';

describe('ApiBaseUrlService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiBaseUrlService]
    });
  });

  it('should be created', inject([ApiBaseUrlService], (service: ApiBaseUrlService) => {
    expect(service).toBeTruthy();
  }));
});
