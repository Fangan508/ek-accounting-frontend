import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankBookPositionsStepComponent } from './bank-book-positions-step.component';

describe('BankBookPositionsStepComponent', () => {
  let component: BankBookPositionsStepComponent;
  let fixture: ComponentFixture<BankBookPositionsStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankBookPositionsStepComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankBookPositionsStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
