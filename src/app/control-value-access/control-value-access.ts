import { Component, HostListener } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-control-value-access',
  standalone: false,
  templateUrl: './control-value-access.html',
  styleUrl: './control-value-access.scss',
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: ControlValueAccess },
  ],
})
export class ControlValueAccess implements ControlValueAccessor {
  onChange: OnChangeFn<boolean> = () => {};
  onTouched: OnTouchedFn = () => {};
  pressed = false;
  disabled = false;
  togglePressed() {
    this.pressed = !this.pressed;
    this.onChange(this.pressed);
  }

  //ControlValueAccessor methods

  writeValue(obj: boolean): void {
    if (obj === null) return;
    this.pressed = !obj;
  }
  registerOnChange(fn: OnChangeFn<boolean>): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: OnTouchedFn): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.pressed = isDisabled;
  }

  @HostListener('focusout')
  onFocusOut() {
    this.onTouched();
  }
}
type OnChangeFn<T> = (value: T) => void;
type OnTouchedFn = () => void;
