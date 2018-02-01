import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDrillsComponent } from './list-drills.component';

describe('ListDrillsComponent', () => {
  let component: ListDrillsComponent;
  let fixture: ComponentFixture<ListDrillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDrillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDrillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
