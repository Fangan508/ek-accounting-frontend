import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankBookPosDocNumberComponent } from './bank-book-pos-doc-number.component';

describe('BankBookPosDocNumberComponent', () => {
  let component: BankBookPosDocNumberComponent;
  let fixture: ComponentFixture<BankBookPosDocNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankBookPosDocNumberComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankBookPosDocNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
