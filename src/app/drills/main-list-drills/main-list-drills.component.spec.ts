import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainListDrillsComponent } from './main-list-drills.component';

describe('MainListDrillsComponent', () => {
  let component: MainListDrillsComponent;
  let fixture: ComponentFixture<MainListDrillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainListDrillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainListDrillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
