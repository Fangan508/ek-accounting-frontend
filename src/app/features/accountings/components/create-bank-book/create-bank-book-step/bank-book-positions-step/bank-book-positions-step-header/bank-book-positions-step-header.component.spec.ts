import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankBookPositionsStepHeaderComponent } from './bank-book-positions-step-header.component';

describe('BankBookPositionsStepHeaderComponent', () => {
  let component: BankBookPositionsStepHeaderComponent;
  let fixture: ComponentFixture<BankBookPositionsStepHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankBookPositionsStepHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankBookPositionsStepHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
