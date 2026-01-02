import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveExportDropdownbuttonComponent } from './save-export-dropdownbutton.component';

describe('SaveExportDropdownbuttonComponent', () => {
  let component: SaveExportDropdownbuttonComponent;
  let fixture: ComponentFixture<SaveExportDropdownbuttonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaveExportDropdownbuttonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaveExportDropdownbuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
