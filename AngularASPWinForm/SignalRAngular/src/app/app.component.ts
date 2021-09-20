import { Component, OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';

declare function connect(): any;
declare function sendMessage(msg: string): any;
declare function disconnect(): any;
  
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit, OnDestroy {
  constructor() { }
  ngOnDestroy(): void {
    disconnect();
  }

  sendToUser!: string;
  message!: string;
  ngOnInit(): void {  }

  ConnectHub() {
    connect();
  }

  SendMessage() {    
    sendMessage(JSON.stringify({sendTo: this.sendToUser, MessageText: this.message }));
  }
}
