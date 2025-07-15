import { Component, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  AsyncValidator,
  AsyncValidatorFn,
} from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { ProfileModel } from '../interface/profile.model';
import { debounce, debounceTime, delay, first, of, switchMap } from 'rxjs';
import { FakeBackend } from '../fake-backend';

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

  constructor(private fb: FormBuilder, private backend: FakeBackend) {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required, Validators.minLength(3)],
      lastName: ['', Validators.required ,Validators.minLength(3)],
      username: ['',Validators.required, this.alphanumericValidator],
      email: ['',
        [Validators.required, Validators.email],
        [this.emailNotTakenValidator()], 
      ],
      phone: ['', this.phoneValidator],
      imageUrl: ['', this.urlValidator]
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
    const valid = /^[a-zA-Z0-9_]+$/.test(control.value);
    return valid ? null : { invalidUsername: true };
  }
  get f() {
    return this.profileForm.controls;
  }
  emailNotTakenValidator(): AsyncValidatorFn {
    return (control: AbstractControl) => {
      return this.backend.checkEmailNotTaken(control.value).pipe(delay(1000));
    };
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
