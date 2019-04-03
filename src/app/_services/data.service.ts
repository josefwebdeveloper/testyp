import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/';
import { Setup } from '../_models/Setup';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor() {
  }

  private subjectSetup = new BehaviorSubject<any>('');
  private subjectToken = new BehaviorSubject<any>('');


  sendToken(token) {
    this.subjectToken.next(token);
  }

  getToken(): Observable<string> {
    return this.subjectToken.asObservable();
  }

  sendSetup(setup) {
    console.log('dataService sendSetup');

    this.subjectSetup.next(setup);
  }

  getSetup(): Observable<Setup> {
    return this.subjectSetup.asObservable();
  }
}
