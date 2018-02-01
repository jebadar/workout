import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDiyWorkoutComponent } from './add-diy-workout.component';

describe('AddDiyWorkoutComponent', () => {
  let component: AddDiyWorkoutComponent;
  let fixture: ComponentFixture<AddDiyWorkoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDiyWorkoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDiyWorkoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
