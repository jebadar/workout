import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateWrapperComponent } from './template-wrapper.component';

describe('TemplateWrapperComponent', () => {
  let component: TemplateWrapperComponent;
  let fixture: ComponentFixture<TemplateWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
