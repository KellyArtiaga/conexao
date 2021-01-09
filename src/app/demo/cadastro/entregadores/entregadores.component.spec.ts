import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntregadoresComponent } from './entregadores.component';

describe('EntregadoresComponent', () => {
  let component: EntregadoresComponent;
  let fixture: ComponentFixture<EntregadoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntregadoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntregadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
