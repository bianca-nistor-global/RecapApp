import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProfileModel } from '../interface/profile.model';

@Component({
  selector: 'app-template-profile',
  standalone: false,
  templateUrl: './template-profile.html',
  styleUrl: './template-profile.scss',
})
export class TemplateProfile {
  @Input() profile!: ProfileModel;
  @Output() save = new EventEmitter<ProfileModel>();
  @Output() cancel = new EventEmitter<void>();

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.save.emit(this.profile);
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
