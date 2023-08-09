import { ComponentFixture, TestBed } from '@angular/core/testing';

import {JsRenderTryComponent } from './JsRenderTry.component';

describe('JsRenderTryComponent', () => {
  let component: JsRenderTryComponent;
  let fixture: ComponentFixture<JsRenderTryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JsRenderTryComponent]
    });
    fixture = TestBed.createComponent(JsRenderTryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
