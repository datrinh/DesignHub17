import { BehaviorSubject, Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { SocketService, SocketMessage } from '../shared/socket/socket.service';
import { Action } from '../shared/socket/action.model';

const FPS = 60;
const AMOUNT_FRAMES_SKIPPED = 1;
const MINIMAP_ACTIVE = true;

@Injectable()
export class VideoService {

  player: HTMLVideoElement;
  minimap: HTMLVideoElement;

  get currentTime(): number {
    return this.player.currentTime;
  }
  set currentTime(time: number) {
    // this.player.currentTime = time;
    this.currentTimeSub.next(time);
  }

  get duration(): number {
    return this.player.duration;
  }
  set duration(duration: number) {
    this.durationSub.next(duration);
  }

  private durationSub: BehaviorSubject<number> = new BehaviorSubject(0);
  private currentTimeSub: BehaviorSubject<number> = new BehaviorSubject(0);

  duration$: Observable<number> = this.durationSub.asObservable();
  currentTime$: Observable<number> = this.currentTimeSub.asObservable();

  progress$: Observable<number> = Observable
    .combineLatest(
      this.currentTime$, this.duration$,
      (current, duration) => this.calcProgress(current, duration)
    );

  constructor(private socket: SocketService) {
    socket.socket$.subscribe(
      (result: any) => {
        // const result = JSON.parse(res);
        // console.log(JSON.parse(res).type);
        switch (result.action) {
          case 'PLAYPAUSE':
            this.playOrPause();
            break;
          case 'PLAY':
            this.player.play();
            break;
          case 'PAUSE':
            this.player.pause();
            break;
          case 'JUMP_TO':
            this.currentTime = result.payload.timestamp;
            break;
          default:
            console.warn(result);
        }
      }
    );
  }

  playOrPause() {
    if (this.isPlaying()) {
      this.player.pause();
      this.minimap.pause();
      this.socket.send({action: Action.PAUSE});
    } else {
      this.player.play();
      this.minimap.play();
      this.socket.send({action: Action.PLAY});
    }
  }

  mute() {
    if (this.player.muted) {
      this.player.muted = false;
    } else {
      this.player.muted = true;
    }
  }

  jumpFrames(direction: number) {
    // could alter multi based on amount of direction
    const multi = direction > 0 ? AMOUNT_FRAMES_SKIPPED : -AMOUNT_FRAMES_SKIPPED;
    this.player.currentTime = this.player.currentTime + multi / FPS;
    this.minimap.currentTime = this.minimap.currentTime + multi / FPS;
  }

  pauseVideo() {
    this.player.pause();
    this.minimap.pause();
    this.socket.send({action: Action.PAUSE});
  }

  // frameForward(amount: number) {
  //   this.player.currentTime = this.player.currentTime + 1 / FPS;
  // }

  // frameBackwards(amount: number) {
  //   this.player.currentTime = this.player.currentTime - 1 / FPS;
  // }

  // need proper checking against race condition
  // https://stackoverflow.com/questions/36803176/how-to-prevent-the-play-request-was-interrupted-by-a-call-to-pause-error
  isPlaying(): boolean {
    return this.player.currentTime > 0 && !this.player.paused && !this.player.ended && this.player.readyState > 2;
  }

  calcProgress(current: number, duration: number): number {
    if (current === 0 && duration === 0) {
      return 0;
    } else {
      return current / duration * 100;
    }
  }

}
