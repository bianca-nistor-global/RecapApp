import { Directive, HostListener, Input } from '@angular/core';
import { InputRestrictions } from '../interface/custom-input-config';

@Directive({
  selector: '[appOnlyNumbers]',
  standalone: false, 
})
export class OnlyNumbersDirective {
  @Input('appOnlyNumbers') inputRestrictions : InputRestrictions ={};
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (!this.inputRestrictions.onlyNumbers) return;

    const allowed = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete', 'Home', 'End'];
    const isCtrl = event.ctrlKey || event.metaKey;

    if (
      allowed.includes(event.key) ||
      (isCtrl && ['a', 'c', 'v', 'x'].includes(event.key.toLowerCase())) ||
      /^[0-9]$/.test(event.key)
    ) return;

    event.preventDefault();
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent) {
    if (!this.inputRestrictions.onlyNumbers) return;

    const pasted = event.clipboardData?.getData('text') ?? '';
    if (!/^\d+$/.test(pasted)) {
      event.preventDefault();
    }
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent) {
    if (!this.inputRestrictions.onlyNumbers) return;

    const dropped = event.dataTransfer?.getData('text') ?? '';
    if (!/^\d+$/.test(dropped)) {
      event.preventDefault();
    }
  }
}
