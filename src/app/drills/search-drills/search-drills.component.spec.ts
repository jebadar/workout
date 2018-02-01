import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchDrillsComponent } from './search-drills.component';

describe('SearchDrillsComponent', () => {
  let component: SearchDrillsComponent;
  let fixture: ComponentFixture<SearchDrillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchDrillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchDrillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
