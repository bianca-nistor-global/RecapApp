import { Component, OnInit } from '@angular/core';
import { ProfileModel } from '../models/profile.model';
import { PROFILES } from './profiles';
@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})
export class Profile implements OnInit{
  editing: boolean = false;
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
    if (PROFILES.length > 0) {
      this.profile = PROFILES[0];
    } else {
      this.profile = {id: 0,
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    phone: '',
    imageUrl: ''};
    }
  }
  startEditing() {
    this.editing = true;
  }
  saveProfile(): void {
  if (PROFILES.length === 0) {
    PROFILES.push(this.profile!);
  } else {
    PROFILES[0] = this.profile!;
  }

  this.editing = false;
}

}
