import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { ProfileModel } from '../models/profile.model';

@Component({
  selector: 'app-reactive-profile',
  templateUrl: './reactive-profile.html',
  standalone: false,
  styleUrls: ['./reactive-profile.scss']
})
export class ReactiveProfile implements OnInit {
  profileForm!: FormGroup;
  @Output() save = new EventEmitter<ProfileModel>();
  @Output() cancel = new EventEmitter<void>();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, this.phoneValidator]],
      imageUrl: ['', [this.urlValidator]],
      username: ['', [Validators.required, Validators.minLength(4), this.alphanumericValidator]],
    });
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
      console.log('Submitted Profile:', this.profileForm.value);
    } else {
      this.profileForm.markAllAsTouched();
    }
  }
  onCancel(): void {
    this.cancel.emit();
  }
}
