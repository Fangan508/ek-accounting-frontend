import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankBookTitleComponent } from './bank-book-title.component';

describe('BankBookTitleComponent', () => {
  let component: BankBookTitleComponent;
  let fixture: ComponentFixture<BankBookTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankBookTitleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankBookTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
