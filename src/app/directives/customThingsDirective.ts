import { Directive, HostListener, Input } from '@angular/core';
import { InputRestrictions } from '../interface/custom-input-config';
import { RouteReuseStrategy } from '@angular/router';

@Directive({
  selector: '[customRestrictions]',
  standalone: false,
})
export class CustomDirective {
  @Input('customRestrictions') inputRestrictions: InputRestrictions = {};
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const restrictions = this.inputRestrictions;
    if (
      !restrictions.onlyNumbers &&
      !restrictions.lowerCase &&
      !restrictions.noSpecialChars &&
      !restrictions.onlyLetters &&
      !restrictions.upperCase
    )
      return;
    const allowed = [
      'Backspace',
      'Tab',
      'ArrowLeft',
      'ArrowRight',
      'Delete',
      'Home',
      'End',
    ];
    const isCtrl = event.ctrlKey || event.metaKey;
    const key = event.key;
    if (
      allowed.includes(key) ||
      (isCtrl && ['a', 'c', 'v', 'x'].includes(event.key.toLowerCase()))
    )
      return;

    if (restrictions.onlyNumbers && !/^[0-9]$/.test(key)) {
      return event.preventDefault();
    }
    if (restrictions.onlyLetters && !/^[a-zA-Z]$/.test(key)) {
      return event.preventDefault();
    }
    if (restrictions.noSpecialChars && !/^[a-zA-Z0-9 ]$/.test(key)) {
      return event.preventDefault();
    }
    if (restrictions.lowerCase && !/^[a-z0-9]$/.test(key)) {
      return event.preventDefault();
    }
    if (restrictions.upperCase && !/^[A-Z0-9]$/.test(key)) {
      return event.preventDefault();
    }
  }

  // @HostListener('paste', ['$event'])
  // onPaste(event: ClipboardEvent) {
  //   if (!this.inputRestrictions.onlyNumbers) return;

  //   const pasted = event.clipboardData?.getData('text') ?? '';
  //   if (!/^\d+$/.test(pasted)) {
  //     event.preventDefault();
  //   }
  // }

  // @HostListener('drop', ['$event'])
  // onDrop(event: DragEvent) {
  //   if (!this.inputRestrictions.onlyNumbers) return;

  //   const dropped = event.dataTransfer?.getData('text') ?? '';
  //   if (!/^\d+$/.test(dropped)) {
  //     event.preventDefault();
  //   }
  // }
}
