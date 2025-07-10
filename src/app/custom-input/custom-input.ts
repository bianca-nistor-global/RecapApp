import { Component, Self, Optional, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NgControl
} from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.html',
  styleUrls: ['./custom-input.scss'],
  standalone: false,
  // providers: [
  //   { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: CustomInput },
  // ], DACA NU E STANDALONE NU PUN ASTA AICI O PUN IN NG MODEL
})
export class CustomInput implements ControlValueAccessor {
  value: any = '';
  disabled = false;

  constructor(@Self() @Optional() public ngControl: NgControl) {
    if (ngControl) {
      ngControl.valueAccessor = this;
    }
  }

  // CVA methods
  onChange = (_: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  handleInput(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.value = inputValue;
    this.onChange(inputValue);
    this.onTouched();
  }

  get control() {
    return this.ngControl?.control;
  }

  get errorMessage(): string | null {
    if (!this.control || !this.control.touched || !this.control.errors) return null;

    const errors = this.control.errors;
    if (errors['required']) return 'This field is required.';
    if (errors['minlength']) return `Minimum length is ${errors['minlength'].requiredLength}`;
    if (errors['email']) return 'Invalid email format.';
    return 'Invalid value.';
  }
}
