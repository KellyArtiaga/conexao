/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EntregadoresVeiculosCadastroComponent } from './entregadores-veiculos-cadastro.component';

describe('EntregadoresVeiculosCadastroComponent', () => {
  let component: EntregadoresVeiculosCadastroComponent;
  let fixture: ComponentFixture<EntregadoresVeiculosCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntregadoresVeiculosCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntregadoresVeiculosCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
