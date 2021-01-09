import { TestBed } from '@angular/core/testing';

import { BaseRestBusinessService } from './base-rest-business.service';

describe('BaseRestBusinessService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BaseRestBusinessService = TestBed.get(BaseRestBusinessService);
    expect(service).toBeTruthy();
  });
});
