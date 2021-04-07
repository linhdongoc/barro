import { Component, OnInit } from '@angular/core';
import { IUserSettings } from '../../interfaces/user-settings.inteface';
import { NgForm, NgModel } from '@angular/forms';
import { UserSettingsService } from '@app/services/user-settings.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-user-settings-form',
  templateUrl: './user-settings-form.component.html',
  styleUrls: ['./user-settings-form.component.scss']
})
export class UserSettingsFormComponent implements OnInit {
  pageTitle = 'User Settings';
  originalUserSettings: IUserSettings = {
    // name: 'Milton',
    // emailOffers: true,
    // interfaceStyle: 'dark',
    // subscriptionType: 'Annual',
    // notes: 'here are some notes ...'
    name: null,
    emailOffers: null,
    interfaceStyle: null,
    subscriptionType: null,
    notes: null
  };
  userSettings: IUserSettings = { ...this.originalUserSettings };
  postError =  false;
  postErrorMessage: string;
  subscriptionTypes: Observable<string[]>;
  singleModel = 'On';
  startDate: Date;
  startTime: Date;
  userRating = 0;
  maxRating = 10;

  constructor(private userSettingsService: UserSettingsService) { }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.userSettingsService.postUserSettingsForm(this.userSettings).subscribe(
        result => console.log('success', result),
        error => this.onHttpError(error)
      );
    } else {
      this.postError = true;
      this.postErrorMessage = 'Please fix the above errors';
    }
  }

  onBlur(nameField: NgModel) { }

  onHttpError(errorResponse: any) {
    this.postError = true;
    this.postErrorMessage = errorResponse.error.errorMessage;
  }

  ngOnInit(): void {
    this.subscriptionTypes = this.userSettingsService.getSubscriptionTypes();
    this.startDate = new Date();
    this.startTime = new Date();
  }
}
