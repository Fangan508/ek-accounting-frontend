import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatepickerFormFieldComponent } from './datepicker-form-field.component';

describe('DatepickerFormFieldComponent', () => {
  let component: DatepickerFormFieldComponent;
  let fixture: ComponentFixture<DatepickerFormFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatepickerFormFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatepickerFormFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
