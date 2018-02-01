import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewWorkoutWrapperComponent } from './new-workout-wrapper.component';

describe('NewWorkoutWrapperComponent', () => {
  let component: NewWorkoutWrapperComponent;
  let fixture: ComponentFixture<NewWorkoutWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewWorkoutWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewWorkoutWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
