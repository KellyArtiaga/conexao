import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntregadoresDadosBancariosComponent } from './entregadores-dados-bancarios.component';

describe('EntregadoresDadosBancariosComponent', () => {
  let component: EntregadoresDadosBancariosComponent;
  let fixture: ComponentFixture<EntregadoresDadosBancariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntregadoresDadosBancariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntregadoresDadosBancariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
