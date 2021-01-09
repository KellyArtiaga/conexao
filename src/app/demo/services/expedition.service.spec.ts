import { TestBed } from '@angular/core/testing';

import { ExpeditionService } from './expedition.service';

describe('ExpeditionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExpeditionService = TestBed.get(ExpeditionService);
    expect(service).toBeTruthy();
  });
});
