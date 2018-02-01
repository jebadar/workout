import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAdminWrapperComponent } from './user-admin-wrapper.component';

describe('UserAdminWrapperComponent', () => {
  let component: UserAdminWrapperComponent;
  let fixture: ComponentFixture<UserAdminWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAdminWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAdminWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
