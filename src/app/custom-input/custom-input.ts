import { Component, Self, Optional, Input } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { CustomInputConfig } from '../interface/custom-input-config';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.html',
  styleUrls: ['./custom-input.scss'],
  standalone: false
})
export class CustomInput implements ControlValueAccessor {
  @Input() config!: CustomInputConfig;

  private innerValue: any = '';
  disabled = false;

  constructor(@Self() @Optional() public control: NgControl) {
    if (this.control) {
      this.control.valueAccessor = this;
    }
  }

  get label() {
    return this.config?.label ?? '';
  }

  get placeholder() {
    return this.config?.placeholder ?? '';
  }

  get type() {
    return this.config?.type ?? 'text';
  }

  get icon() {
    return this.config?.icon ?? '';
  }

  onChange = (_: any) => {};
  onTouched = () => {};

  get value(): any {
    return this.innerValue;
  }

  set value(val: any) {
    this.innerValue = val;
    this.onChange(val);
    this.onTouched();
  }

  writeValue(value: any): void {
    this.innerValue = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  handleInput(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    this.value = val;
    this.config.input?.(event); 
  }

  get errorMessage(): string | null {
    if (!this.control || !this.control.touched || !this.control.errors) return null;

    const errors = this.control.errors;
    if (errors['required']) return `${this.label} is required.`;
    if (errors['minlength']) return `Minimum length is ${errors['minlength'].requiredLength}`;
    if (errors['maxlength']) return `Maximum length is ${errors['maxlength'].requiredLength}`;
    if (errors['email']) return 'Invalid email format.';
    if (this.config.errorMessage) return this.config.errorMessage;
    return 'Invalid value.';
  }
}
