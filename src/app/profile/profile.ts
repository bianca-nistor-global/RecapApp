import { Component, OnInit } from '@angular/core';
import { ProfileModel } from '../models/profile.model';
import { PROFILES } from './profiles';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})
export class Profile implements OnInit {
  editing: boolean = false;
  hasProfile: boolean = false;
  formMode: 'none' | 'reactive' | 'template' = 'none';

  profile: ProfileModel = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    phone: '',
    imageUrl: ''
  };

  ngOnInit(): void {
    // Load existing profile if available
    if (PROFILES.length > 0) {
      this.profile = PROFILES[0];
      this.hasProfile = true;
    }
  }

  setFormMode(mode: 'reactive' | 'template'): void {
    this.formMode = mode;
    this.editing = true;
  }

  startEditing(): void {
    this.editing = true;
    this.formMode = 'template'; // Default to template if no mode was chosen
  }

  cancelEditing(): void {
    this.editing = false;
    this.formMode = 'none';
  }

  saveProfile(): void {
    if (PROFILES.length === 0) {
      PROFILES.push(this.profile);
    } else {
      PROFILES[0] = this.profile;
    }

    this.editing = false;
    this.hasProfile = true;
    this.formMode = 'none';
  }

  onProfileSaved(updatedProfile: ProfileModel): void {
    this.profile = updatedProfile;
    this.saveProfile();
  }
}
