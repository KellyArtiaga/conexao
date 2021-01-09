import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollBehaviourComponent } from './scroll-behaviour.component';

describe('ScrollBehaviourComponent', () => {
  let component: ScrollBehaviourComponent;
  let fixture: ComponentFixture<ScrollBehaviourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScrollBehaviourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrollBehaviourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
