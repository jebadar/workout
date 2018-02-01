import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTemplatesComponent } from './search-templates.component';

describe('SearchTemplatesComponent', () => {
  let component: SearchTemplatesComponent;
  let fixture: ComponentFixture<SearchTemplatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchTemplatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
