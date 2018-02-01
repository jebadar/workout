import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTemplateComponent } from './add-template.component';

describe('AddTemplateComponent', () => {
  let component: AddTemplateComponent;
  let fixture: ComponentFixture<AddTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
