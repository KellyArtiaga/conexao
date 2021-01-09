/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BancosService } from './bancos.service';

describe('Service: Bancos', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BancosService]
    });
  });

  it('should ...', inject([BancosService], (service: BancosService) => {
    expect(service).toBeTruthy();
  }));
});
