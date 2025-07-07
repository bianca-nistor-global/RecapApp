import { Component } from '@angular/core';
import { ProfileModel } from '../models/profile.model';
import { PROFILES } from '../profile/profiles';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
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
}
