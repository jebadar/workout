import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDurationComponent } from './edit-duration.component';

describe('EditDurationComponent', () => {
  let component: EditDurationComponent;
  let fixture: ComponentFixture<EditDurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
