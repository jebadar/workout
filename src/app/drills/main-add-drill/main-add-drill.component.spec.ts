import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainAddDrillComponent } from './main-add-drill.component';

describe('MainAddDrillComponent', () => {
  let component: MainAddDrillComponent;
  let fixture: ComponentFixture<MainAddDrillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainAddDrillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainAddDrillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
