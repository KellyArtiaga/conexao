/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ModulosService } from './modulos.service';

describe('Service: Modulos', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModulosService]
    });
  });

  it('should ...', inject([ModulosService], (service: ModulosService) => {
    expect(service).toBeTruthy();
  }));
});
