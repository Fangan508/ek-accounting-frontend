import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBankBookStepComponent } from './create-bank-book-step.component';

describe('CreateBankBookStepComponent', () => {
  let component: CreateBankBookStepComponent;
  let fixture: ComponentFixture<CreateBankBookStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateBankBookStepComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateBankBookStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
