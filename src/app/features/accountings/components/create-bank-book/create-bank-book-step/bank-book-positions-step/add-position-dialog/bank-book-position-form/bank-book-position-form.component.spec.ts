import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankBookPositionFormComponent } from './bank-book-position-form.component';

describe('BankBookPositionFormComponent', () => {
  let component: BankBookPositionFormComponent;
  let fixture: ComponentFixture<BankBookPositionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankBookPositionFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankBookPositionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
