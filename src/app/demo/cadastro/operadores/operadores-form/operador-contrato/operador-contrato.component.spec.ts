import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperadorContratoComponent } from './operador-contrato.component';

describe('OperadorContratoComponent', () => {
  let component: OperadorContratoComponent;
  let fixture: ComponentFixture<OperadorContratoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperadorContratoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperadorContratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
