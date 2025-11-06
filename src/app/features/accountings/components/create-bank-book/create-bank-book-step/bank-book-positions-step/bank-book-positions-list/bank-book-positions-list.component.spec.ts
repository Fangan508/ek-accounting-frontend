import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankBookPositionsListComponent } from './bank-book-positions-list.component';

describe('BankBookPositionsListComponent', () => {
  let component: BankBookPositionsListComponent;
  let fixture: ComponentFixture<BankBookPositionsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankBookPositionsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankBookPositionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
