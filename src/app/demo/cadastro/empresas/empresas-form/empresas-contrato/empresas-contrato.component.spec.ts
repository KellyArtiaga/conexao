import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresasContratoComponent } from './empresas-contrato.component';

describe('EmpresasContratoComponent', () => {
  let component: EmpresasContratoComponent;
  let fixture: ComponentFixture<EmpresasContratoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpresasContratoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpresasContratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
