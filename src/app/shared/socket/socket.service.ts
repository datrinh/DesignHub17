import { Injectable } from '@angular/core';
import { WebSocketSubject } from 'rxjs/observable/dom/WebSocketSubject';
import { Observable } from 'rxjs/Observable';
import { Annotation } from '../annotation/annotation.service';
import { VideoService } from '../../video/video.service';
import * as socketIo from 'socket.io-client';

const SOCKET_URL = 'ws://localhost:3000';

export interface SocketMessage {
  type: string;
  payload?: any;
}

@Injectable()
export class SocketService {

  socket$: WebSocketSubject<any>;

  constructor() {
    this.socket$ = WebSocketSubject.create(SOCKET_URL);

    this.socket$.subscribe(
      (message) => console.log('<-- ' + message),
      (err) => console.error('Error on WebSocket:', err),
      () => console.warn('Completed!')
    );
  }

  send(message: SocketMessage) {
    const tmp: any = {};
    tmp.type = message.type;
    tmp.payload = message.payload;
    this.socket$.next(JSON.stringify(tmp));
  }

  // handleResponse(response: any) {
  //   switch (response.type) {
  //     case 'PLAYPAUSE':
  //       this.video.playOrPause();
  //       break;
  //     case 'JUMP_TO':
  //       this.video.currentTime = response.payload.timestamp;
  //       break;
  //     default:
  //       console.log('WS: ' + response);
  //   }
  // }

}
