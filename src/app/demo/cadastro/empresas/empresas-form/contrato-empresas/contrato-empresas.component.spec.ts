import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratoEmpresasComponent } from './contrato-empresas.component';

describe('ContratoEmpresasComponent', () => {
  let component: ContratoEmpresasComponent;
  let fixture: ComponentFixture<ContratoEmpresasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContratoEmpresasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratoEmpresasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
