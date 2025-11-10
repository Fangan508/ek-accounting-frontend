import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextboxFormFieldComponent } from './textbox-form-field.component';

describe('TextboxFormFieldComponent', () => {
  let component: TextboxFormFieldComponent;
  let fixture: ComponentFixture<TextboxFormFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextboxFormFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextboxFormFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
