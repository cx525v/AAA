import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

declare function connect(): any;
declare function sendMessage(msg: string): any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
  constructor() { }

  ngOnInit(): void {  }

  ConnectHub() {
    connect();
  }

  SendMessage() {
     
    sendMessage('This is a test message');
   
  }
}
