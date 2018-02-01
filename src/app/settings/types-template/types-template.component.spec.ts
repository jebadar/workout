import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypesTemplateComponent } from './types-template.component';

describe('TypesTemplateComponent', () => {
  let component: TypesTemplateComponent;
  let fixture: ComponentFixture<TypesTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypesTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypesTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
