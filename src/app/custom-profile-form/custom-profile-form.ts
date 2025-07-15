import { Component, Input, Output } from '@angular/core';
import { CustomInputConfig } from '../interface/custom-input-config';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ProfileModel } from '../interface/profile.model';
import { EventEmitter } from '@angular/core';
import { PROFILES } from '../../../public/profiles';

@Component({
  selector: 'app-custom-profile-form',
  standalone: false,
  templateUrl: './custom-profile-form.html',
  styleUrl: './custom-profile-form.scss',
})
export class CustomProfileForm {
  editing: boolean = false;
  form!: FormGroup;
  @Input() profile!: ProfileModel;
  @Output() save = new EventEmitter<ProfileModel>();
  @Output() cancel = new EventEmitter<void>();
  constructor(private fb: FormBuilder) {}

  configList: CustomInputConfig[] = [
    {
      FormControlName: 'firstName',
      label: 'First Name',
      placeholder: 'Enter your first name',
      required: true,
      minLength: 3,
      type: 'text',
      inputRestrictions: {
        onlyLetters: true,
        noSpecialChars: true,
      },
    },
    {
      FormControlName: 'lastName',
      label: 'Last Name',
      placeholder: 'Enter your last name',
      required: true,
      minLength: 3,
      type: 'text',
      inputRestrictions: {
        onlyLetters: true,
        noSpecialChars: true,
      },
    },
    {
      FormControlName: 'username',
      label: 'Username',
      placeholder: 'Enter your username',
      required: true,
      minLength: 3,
      type: 'text',
      inputRestrictions: {
      },
    },
    {
      FormControlName: 'email',
      label: 'Email',
      placeholder: 'Enter your email',
      required: true,
      minLength: 3,
      type: 'text',
      inputRestrictions: {
      },
    },
    {
      FormControlName: 'phone',
      label: 'Phone',
      placeholder: 'Enter your phone number',
      required: true,
      minLength: 8,
      inputRestrictions: {
        onlyNumbers: true,
      },
    },
    {
      FormControlName: 'imageUrl',
      label: 'Immage Url',
      placeholder: 'Enter the url to your profile picture',
      required: true,
      minLength: 8,
      inputRestrictions: {
      },
    },
    
    
  ];

  ngOnInit(): void {
    this.form = this.fb.group({});
    this.configList.forEach((cfg) => {
      const validators = [];
      if (cfg.required) validators.push(Validators.required);
      if (cfg.minLength) validators.push(Validators.minLength(cfg.minLength));
      if (cfg.maxLength) validators.push(Validators.maxLength(cfg.maxLength));
      this.form.addControl(
        cfg.FormControlName,
        new FormControl('', validators)
      );
    });
    this.profile = PROFILES[0];
  }

  onSubmit() {
    if (this.form.valid) {
      this.profile = this.form.value as ProfileModel;
      this.save.emit(this.profile);
    }
  }
  onCancel(): void {
    this.cancel.emit();
  }
}
