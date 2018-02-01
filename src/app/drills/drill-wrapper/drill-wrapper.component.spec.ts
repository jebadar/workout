import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrillWrapperComponent } from './drill-wrapper.component';

describe('DrillWrapperComponent', () => {
  let component: DrillWrapperComponent;
  let fixture: ComponentFixture<DrillWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrillWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrillWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
