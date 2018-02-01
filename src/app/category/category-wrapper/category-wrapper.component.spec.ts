import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryWrapperComponent } from './category-wrapper.component';

describe('CategoryWrapperComponent', () => {
  let component: CategoryWrapperComponent;
  let fixture: ComponentFixture<CategoryWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
