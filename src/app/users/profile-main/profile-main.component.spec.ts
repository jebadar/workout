import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileMainComponent } from './profile-main.component';

describe('ProfileMainComponent', () => {
  let component: ProfileMainComponent;
  let fixture: ComponentFixture<ProfileMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
