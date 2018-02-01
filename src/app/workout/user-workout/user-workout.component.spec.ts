import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserWorkoutComponent } from './user-workout.component';

describe('UserWorkoutComponent', () => {
  let component: UserWorkoutComponent;
  let fixture: ComponentFixture<UserWorkoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserWorkoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserWorkoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
