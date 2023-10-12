import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesGeneratorComponent } from './pages-generator.component';

describe('PagesGeneratorComponent', () => {
  let component: PagesGeneratorComponent;
  let fixture: ComponentFixture<PagesGeneratorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PagesGeneratorComponent]
    });
    fixture = TestBed.createComponent(PagesGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
