import { Injectable } from '@angular/core';
import { WebSocketSubject } from 'rxjs/observable/dom/WebSocketSubject';
import { Observable } from 'rxjs/Observable';
import { Annotation } from '../annotation/annotation.service';
import { VideoService } from '../../video/video.service';
import * as socketIo from 'socket.io-client';

const SERVER_URL = 'http://localhost:3000';

export enum Action {
  PLAY = 'PLAY',
  PAUSE = 'PAUSE',
  UPDATE_ANNOTATION = 'UPDATE_ANNOTATION'
}

export interface SocketMessage {
  action: Action;
  payload?: any;
}

@Injectable()
export class SocketService {
  private socket;
  socket$;

  constructor() {
    this.socket = socketIo(SERVER_URL);

    this.socket$ = new Observable<any>(observer => {
      this.socket.on('message', (data: any) => observer.next(data));
    });
  }

  send(message: SocketMessage) {
    const tmp: any = {};
    tmp.type = message.action;
    tmp.payload = message.payload;
    // this.socket$.next(JSON.stringify(tmp));
    this.socket.emit('message', JSON.stringify(tmp));
  }
}
