import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DorisComponent } from './doris.component';

describe('DorisComponent', () => {
  let component: DorisComponent;
  let fixture: ComponentFixture<DorisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DorisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DorisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
