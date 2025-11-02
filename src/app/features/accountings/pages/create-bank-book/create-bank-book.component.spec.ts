import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBankBookComponent } from './create-bank-book.component';

describe('CreateBankBookComponent', () => {
  let component: CreateBankBookComponent;
  let fixture: ComponentFixture<CreateBankBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateBankBookComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateBankBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
