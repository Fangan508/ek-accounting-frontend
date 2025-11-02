import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankBooksHeaderComponent } from './bank-books-header.component';

describe('BankBooksHeaderComponent', () => {
  let component: BankBooksHeaderComponent;
  let fixture: ComponentFixture<BankBooksHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankBooksHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankBooksHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
