import { Component, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { ProfileModel } from '../models/profile.model';

@Component({
  selector: 'app-reactive-profile',
  templateUrl: './reactive-profile.html',
  standalone: false,
  styleUrls: ['./reactive-profile.scss'],
})
export class ReactiveProfile implements OnInit {
  profileForm!: FormGroup;
  @Input() profile!: ProfileModel;
  @Output() save = new EventEmitter<ProfileModel>();
  @Output() cancel = new EventEmitter<void>();

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      email: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]
      ],
      phone: ['', Validators.pattern('^\\+?[0-9]{8,}$')],
      imageUrl: ['']
    });
  }
  ngOnInit(): void {
    if (this.profile) {
      this.profileForm.patchValue(this.profile);
    }
  }

  phoneValidator(control: AbstractControl): ValidationErrors | null {
    const valid = /^[0-9]{10,15}$/.test(control.value);
    return valid ? null : { invalidPhone: true };
  }

  urlValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;
    try {
      new URL(control.value);
      return null;
    } catch {
      return { invalidUrl: true };
    }
  }

  alphanumericValidator(control: AbstractControl): ValidationErrors | null {
    const valid = /^[a-zA-Z0-9]+$/.test(control.value);
    return valid ? null : { invalidUsername: true };
  }

  get f() {
    return this.profileForm.controls;
  }

  onSubmit() {
    if (this.profileForm.valid) {
      this.save.emit(this.profileForm.value);
    } else {
      this.profileForm.markAllAsTouched();
    }
  }
  onCancel(): void {
    this.cancel.emit();
  }
}
