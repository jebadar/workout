import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FetchUsersComponent } from './fetch-users.component';

describe('FetchUsersComponent', () => {
  let component: FetchUsersComponent;
  let fixture: ComponentFixture<FetchUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FetchUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FetchUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
