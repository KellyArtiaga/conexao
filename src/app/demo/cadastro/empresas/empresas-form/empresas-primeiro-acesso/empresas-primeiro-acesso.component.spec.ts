import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresasPrimeiroAcessoComponent } from './empresas-primeiro-acesso.component';

describe('EmpresasPrimeiroAcessoComponent', () => {
  let component: EmpresasPrimeiroAcessoComponent;
  let fixture: ComponentFixture<EmpresasPrimeiroAcessoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpresasPrimeiroAcessoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpresasPrimeiroAcessoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
