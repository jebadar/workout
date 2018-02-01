import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrillCategoriesComponent } from './drill-categories.component';

describe('DrillCategoriesComponent', () => {
  let component: DrillCategoriesComponent;
  let fixture: ComponentFixture<DrillCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrillCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrillCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
