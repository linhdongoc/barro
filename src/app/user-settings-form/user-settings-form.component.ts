import { Component } from '@angular/core';
import { IUserSettings } from './user-settings';

@Component({
  selector: 'app-user-settings-form',
  templateUrl: './user-settings-form.component.html',
  styleUrls: ['./user-settings-form.component.css']
})
export class UserSettingsFormComponent {
  pageTitle = 'User Settings';
  originalUserSettings: IUserSettings = {
    name: 'Milton',
    emailOffers: true,
    interfaceStyle: 'dark',
    subscriptionType: 'Annual',
    notes: 'here are some notes ...'
  };
  userSettings: IUserSettings = { ...this.originalUserSettings };
}
