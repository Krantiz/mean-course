import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  storedLog = [];

  onLogAdded(log){
  	this.storedLog.push(log);
  }
}
