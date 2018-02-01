import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleWorkoutComponent } from './single-workout.component';

describe('SingleWorkoutComponent', () => {
  let component: SingleWorkoutComponent;
  let fixture: ComponentFixture<SingleWorkoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleWorkoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleWorkoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
