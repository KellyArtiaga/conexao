import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntregadoresVeiculosComponent } from './entregadores-veiculos.component';

describe('EntregadoresVeiculosComponent', () => {
  let component: EntregadoresVeiculosComponent;
  let fixture: ComponentFixture<EntregadoresVeiculosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntregadoresVeiculosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntregadoresVeiculosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
