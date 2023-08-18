import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPageWizard1Component } from './edit-page-wizard1.component';

describe('EditPageWizard1Component', () => {
  let component: EditPageWizard1Component;
  let fixture: ComponentFixture<EditPageWizard1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditPageWizard1Component]
    });
    fixture = TestBed.createComponent(EditPageWizard1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
