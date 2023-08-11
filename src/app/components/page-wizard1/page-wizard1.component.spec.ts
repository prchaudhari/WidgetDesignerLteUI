import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageWizard1Component } from './page-wizard1.component';

describe('PageWizard1Component', () => {
  let component: PageWizard1Component;
  let fixture: ComponentFixture<PageWizard1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageWizard1Component]
    });
    fixture = TestBed.createComponent(PageWizard1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
