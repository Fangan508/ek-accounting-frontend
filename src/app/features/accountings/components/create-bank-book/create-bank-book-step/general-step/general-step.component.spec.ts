import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralStepComponent } from './general-step.component';

describe('GeneralStepComponent', () => {
  let component: GeneralStepComponent;
  let fixture: ComponentFixture<GeneralStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneralStepComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
