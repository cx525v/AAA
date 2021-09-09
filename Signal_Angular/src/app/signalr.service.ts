import { Injectable, Component } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  connection: signalR.HubConnection;
  hubHelloMessage: BehaviorSubject<string>;
  
  constructor() {
    this.hubHelloMessage = new BehaviorSubject<string>(null);
   }

  public initiateSignalrConnection(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.connection = new signalR.HubConnectionBuilder()
        .withUrl('http://localhost:5000/signalr')  
        .build();
  
      this.setSignalrClientMethods();
  
      
      this.connection
        .start()
        .then(() => {
          console.log(`SignalR connection success! connectionId: ${this.connection.connectionId} `);
            resolve();
        })
        .catch((error) => {
          console.log(`SignalR connection error: ${error}`);
            reject();
        });

       
    });
  }

  private setSignalrClientMethods(): void {
    this.connection.on('DisplayMessage', (message: string) => {
      this.hubHelloMessage.next(message);
    });
  }
}
