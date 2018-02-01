import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateCategoriesComponent } from './template-categories.component';

describe('TemplateCategoriesComponent', () => {
  let component: TemplateCategoriesComponent;
  let fixture: ComponentFixture<TemplateCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
