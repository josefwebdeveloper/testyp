import { Component, OnInit } from '@angular/core';
import { ApiService } from './_services/api.service';
import { Setup } from './_models/Setup';
import { DataService } from './_services/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  tokenSub: Subscription;
  showSpinner = true;

  constructor(private api: ApiService, private data: DataService) {
    this.tokenSub = this.data.getToken().subscribe(token => {
      console.log('tokenSub', token);
      if (token) {
        this.getSetup();
      }
    });
  }

  ngOnInit() {
    this.api.getToken();
  }

  getSetup() {
    this.api.getSetup().subscribe(res => {
      console.log('app sendSetup', res);
      this.data.sendSetup(res);
      this.showSpinner = false;
    });
  }
}

