import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewDrillComponent } from './preview-drill.component';

describe('PreviewDrillComponent', () => {
  let component: PreviewDrillComponent;
  let fixture: ComponentFixture<PreviewDrillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewDrillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewDrillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
