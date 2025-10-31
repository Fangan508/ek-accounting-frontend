import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankBookDetailsComponent } from './bank-book-details.component';

describe('BankBookDetailsComponent', () => {
  let component: BankBookDetailsComponent;
  let fixture: ComponentFixture<BankBookDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankBookDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankBookDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
