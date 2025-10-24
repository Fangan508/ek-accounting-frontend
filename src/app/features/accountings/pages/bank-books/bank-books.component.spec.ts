import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankBooksComponent } from './bank-books.component';

describe('BankBooksComponent', () => {
  let component: BankBooksComponent;
  let fixture: ComponentFixture<BankBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankBooksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
