import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private url = 'http://localhost:8080';
    private socket: any;
    private socketConnected: boolean;
    constructor() {
        this.socket = io(this.url);
        this.socketConnected = false;
    }

    public getMessages = () => {
      return new Observable((observer) => {
          this.socket.on('aknowledged', (message) => {
              observer.next(message);
          });
      });
  }

}
