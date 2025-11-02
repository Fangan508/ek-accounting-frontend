import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBankBookStepperComponent } from './create-bank-book-stepper.component';

describe('CreateBankBookStepperComponent', () => {
  let component: CreateBankBookStepperComponent;
  let fixture: ComponentFixture<CreateBankBookStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateBankBookStepperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateBankBookStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
