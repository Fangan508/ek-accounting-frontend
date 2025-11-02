import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RequiredFormFieldLabelDirective } from '@ek/shared/directives/required-form-field-label.directive';


@Component({
  selector: 'ek-section-title',
  imports: [CommonModule, RequiredFormFieldLabelDirective],
  templateUrl: './section-title.component.html',
  styleUrl: './section-title.component.scss'
})
export class SectionTitleComponent {
  @Input({ required: true }) title!: string;
  @Input() className = '';
  @Input() required = false;
}
