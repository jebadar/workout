import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickWorkoutComponent } from './quick-workout.component';

describe('QuickWorkoutComponent', () => {
  let component: QuickWorkoutComponent;
  let fixture: ComponentFixture<QuickWorkoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickWorkoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickWorkoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
