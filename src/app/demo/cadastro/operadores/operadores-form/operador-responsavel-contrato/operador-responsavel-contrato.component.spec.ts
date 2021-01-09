/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperadorResponsavelContratoComponent } from './operador-responsavel-contrato.component';

describe('OperadorResponsavelContratoComponent', () => {
  let component: OperadorResponsavelContratoComponent;
  let fixture: ComponentFixture<OperadorResponsavelContratoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperadorResponsavelContratoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperadorResponsavelContratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
