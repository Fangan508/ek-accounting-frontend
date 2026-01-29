import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBankBookDialogComponent } from './create-bank-book-dialog.component';

describe('CreateBankBookDialogComponent', () => {
  let component: CreateBankBookDialogComponent;
  let fixture: ComponentFixture<CreateBankBookDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateBankBookDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateBankBookDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
