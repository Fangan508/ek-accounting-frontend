import { Directive, ElementRef, Input, OnInit, Renderer2 } from "@angular/core";

@Directive({
  selector: '[requiredLabel]',
  standalone: true
})
export class RequiredFormFieldLabelDirective implements OnInit {
  @Input() requiredLabel!: boolean;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    if (this.requiredLabel) {
      const label = this.renderer.createElement('span');
      this.renderer.setProperty(label, 'innerHTML', ' *');
      this.renderer.addClass(label, 'mat-error');
      this.renderer.appendChild(this.el.nativeElement, label);
    }
  }
}