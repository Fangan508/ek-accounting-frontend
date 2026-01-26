import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ChangeDetectorRef, Directive, Input, OnInit } from '@angular/core';
import { distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import {
  ControlValueAccessor,
  AbstractControl,
  FormControl,
  NgControl,
  FormControlName,
  FormGroupDirective,
  FormControlDirective,
  NgModel,
} from '@angular/forms';


@UntilDestroy()
@Directive()
export abstract class AbstractInputControlDirective<T extends FormControl | AbstractControl> implements ControlValueAccessor, OnInit {
  protected constructor(public ngControl: NgControl, public changeDetectorRef: ChangeDetectorRef) {
      if (this.ngControl != null) {
        // Setting the value accessor directly (instead of using the providers) to avoid running into a circular import.
        this.ngControl.valueAccessor = this;
      }
  }

  control!: T;
  controlInstanceChanged$ = new Subject<T>();

  @Input()
  set formControl(formControl: T) {
    this.control = formControl;
  }

  ngOnInit(): void {
    if (this.ngControl instanceof FormControlName) {
      const formGroupDirective = this.ngControl.formDirective as FormGroupDirective;
      const controlName = this.ngControl.name;

      if (!!formGroupDirective && !!controlName) {
        this.control = formGroupDirective.form.controls[controlName] as T;
      }
    } else if (this.ngControl instanceof FormControlDirective) {
      this.control = this.ngControl.control as T;
    } else if (this.ngControl instanceof NgModel) {
      this.control = this.ngControl.control as T;
      this.control.valueChanges.pipe(untilDestroyed(this)).subscribe(() => this.ngControl.viewToModelUpdate(this.control?.value));
    } else if (!this.ngControl) {
      this.control = new FormControl() as T;
    }

    this.controlInstanceChanged$.pipe(untilDestroyed(this)).subscribe(control => {
      this.control = control;
      this._patchControlUpdateFunctions(control);
    });

    this.controlInstanceChanged$.next(this.control);
  }

  writeValue(obj: unknown): void {}

  registerOnChange(fn: (_: unknown) => void): void {}

  registerOnTouched(fn: unknown): void {}

  private _patchControlUpdateFunctions(control: T): void {
    control.statusChanges.pipe(untilDestroyed(this), takeUntil(this.controlInstanceChanged$), distinctUntilChanged()).subscribe(() => {
      this.changeDetectorRef.markForCheck();
    });

    const originalMarkAsTouched = control.markAsTouched;
    control.markAsTouched = (...args): void => {
      originalMarkAsTouched.call(control, ...args);
      this.changeDetectorRef.markForCheck();
    };

    const originalMarkAsDirty = control.markAsDirty;
    control.markAsDirty = (...args): void => {
      originalMarkAsDirty.call(control, ...args);
      this.changeDetectorRef.markForCheck();
    };

    const originalMarkAsUntouched = control.markAsUntouched;
    control.markAsUntouched = (...args): void => {
      originalMarkAsUntouched.call(control, ...args);
      this.changeDetectorRef.markForCheck();
    };

    const originalMarkAsPending = control.markAsPending;
    control.markAsPending = (...args): void => {
      originalMarkAsPending.call(control, ...args);
      this.changeDetectorRef.markForCheck();
    };

    const originalMarkAsPristine = control.markAsPristine;
    control.markAsPristine = (...args): void => {
      originalMarkAsPristine.call(control, ...args);
      this.changeDetectorRef.markForCheck();
    };
  }
}