import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntregadoresDadosPessoaisComponent } from './entregadores-dados-pessoais.component';

describe('EntregadoresDadosPessoaisComponent', () => {
  let component: EntregadoresDadosPessoaisComponent;
  let fixture: ComponentFixture<EntregadoresDadosPessoaisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntregadoresDadosPessoaisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntregadoresDadosPessoaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
