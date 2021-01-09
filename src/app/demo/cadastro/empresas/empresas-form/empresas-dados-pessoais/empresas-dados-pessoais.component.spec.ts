import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresasDadosPessoaisComponent } from './empresas-dados-pessoais.component';

describe('EmpresasDadosPessoaisComponent', () => {
  let component: EmpresasDadosPessoaisComponent;
  let fixture: ComponentFixture<EmpresasDadosPessoaisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpresasDadosPessoaisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpresasDadosPessoaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
