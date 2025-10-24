import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankBooksListComponent } from './bank-books-list.component';

describe('BankBooksListComponent', () => {
  let component: BankBooksListComponent;
  let fixture: ComponentFixture<BankBooksListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankBooksListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankBooksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
