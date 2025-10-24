import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashBooksComponent } from './cash-books.component';

describe('CashBooksComponent', () => {
  let component: CashBooksComponent;
  let fixture: ComponentFixture<CashBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CashBooksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
