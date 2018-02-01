import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FetchCategoryComponent } from './fetch-category.component';

describe('FetchCategoryComponent', () => {
  let component: FetchCategoryComponent;
  let fixture: ComponentFixture<FetchCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FetchCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FetchCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
