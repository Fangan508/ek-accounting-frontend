import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumerictextboxFormFieldComponent } from './numerictextbox-form-field.component';

describe('NumerictextboxFormFieldComponent', () => {
  let component: NumerictextboxFormFieldComponent;
  let fixture: ComponentFixture<NumerictextboxFormFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NumerictextboxFormFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NumerictextboxFormFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
