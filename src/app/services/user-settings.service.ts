import { Injectable } from '@angular/core';
import { IUserSettings } from '../interfaces/user-settings.inteface';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserSettingsService {
  constructor(private http: HttpClient) { }

  postUserSettingsForm(userSettings: IUserSettings): Observable<any> {
    return this.http.post('https://putsreq.com/QBa1sIGyJyeB7723Dthx', userSettings);
    // return of(userSettings);
  }

  getSubscriptionTypes(): Observable<string[]> {
    return of(['Monthly', 'Annual', 'Lifetime']);
  }
}
