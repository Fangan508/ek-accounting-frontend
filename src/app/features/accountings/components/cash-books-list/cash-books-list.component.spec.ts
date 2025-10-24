import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashBooksListComponent } from './cash-books-list.component';

describe('CashBooksListComponent', () => {
  let component: CashBooksListComponent;
  let fixture: ComponentFixture<CashBooksListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CashBooksListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashBooksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
