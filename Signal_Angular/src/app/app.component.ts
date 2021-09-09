import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { SignalrService } from './signalr.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  hubHelloMessage: string;

  constructor(public signalrService: SignalrService) { }

  ngOnInit(): void {

    this.signalrService.hubHelloMessage.subscribe((hubHelloMessage: string) => {
      this.hubHelloMessage = hubHelloMessage;
    });

    
    this.signalrService.connection
      .invoke('SetUserName', 'TestUser')
      .catch(error => {
        console.log(`SignalrDemoHub.Hello() error: ${error}`);
        alert('SignalrDemoHub.Hello() error!, see console for details.');
      }
    );

    
    this.signalrService.connection
      .invoke('Hello')
      .catch(error => {
        console.log(`SignalrDemoHub.Hello() error: ${error}`);
        alert('SignalrDemoHub.Hello() error!, see console for details.');
      }
    );

    // this.signalrService.connection
    //   .invoke('Send', 'hello')
    //   .catch(error => {
    //     console.log(`SignalrDemoHub.Send() error: ${error}`);
    //     alert('SignalrDemoHub.Send() error!, see console for details.');
    //   }
    // );

    // this.signalrService.connection
    //   .invoke('Send','TestUser', 'hello')
    //   .catch(error => {
    //     console.log(`SignalrDemoHub.Send() error: ${error}`);
    //     alert('SignalrDemoHub.SendToClient() error!, see console for details.');
    //   }
    // );

   }
}
