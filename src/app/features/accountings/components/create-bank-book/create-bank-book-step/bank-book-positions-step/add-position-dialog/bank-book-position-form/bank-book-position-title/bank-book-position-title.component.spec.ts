import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankBookPositionTitleComponent } from './bank-book-position-title.component';

describe('BankBookPositionTitleComponent', () => {
  let component: BankBookPositionTitleComponent;
  let fixture: ComponentFixture<BankBookPositionTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankBookPositionTitleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankBookPositionTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
