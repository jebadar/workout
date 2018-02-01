import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMainComponent } from './edit-main.component';

describe('EditMainComponent', () => {
  let component: EditMainComponent;
  let fixture: ComponentFixture<EditMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
