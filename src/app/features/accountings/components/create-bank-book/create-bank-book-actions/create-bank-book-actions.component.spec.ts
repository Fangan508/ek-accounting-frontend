import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBankBookActionsComponent } from './create-bank-book-actions.component';

describe('CreateBankBookActionsComponent', () => {
  let component: CreateBankBookActionsComponent;
  let fixture: ComponentFixture<CreateBankBookActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateBankBookActionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateBankBookActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
