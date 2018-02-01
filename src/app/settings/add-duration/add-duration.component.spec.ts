import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDurationComponent } from './add-duration.component';

describe('AddDurationComponent', () => {
  let component: AddDurationComponent;
  let fixture: ComponentFixture<AddDurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
