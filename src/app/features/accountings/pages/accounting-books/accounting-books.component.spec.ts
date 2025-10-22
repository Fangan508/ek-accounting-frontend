import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountingBooksComponent } from './accounting-books.component';

describe('AccountingBooksComponent', () => {
  let component: AccountingBooksComponent;
  let fixture: ComponentFixture<AccountingBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountingBooksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountingBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
