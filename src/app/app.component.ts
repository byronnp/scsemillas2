import { Component } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { AppSettings } from './app.settings';
import { Settings } from './app.settings.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public settings: Settings;
  constructor(public appSettings:AppSettings){
      this.settings = this.appSettings.settings;
  } 

  ngOnInit() { }
}