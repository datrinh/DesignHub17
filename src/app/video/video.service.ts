import { BehaviorSubject, Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';

@Injectable()
export class VideoService {

  player: HTMLVideoElement;

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
    .combineLatest(this.currentTime$, this.duration$,
    (current, duration) => this.calcProgress(current, duration));


  constructor() { }

  playOrPause() {
    if (this.isPlaying()) {
      this.player.pause();
    } else {
      this.player.play();
    }
  }

  mute() {
    if (this.player.muted) {
      this.player.muted = false;
    } else {
      this.player.muted = true;
    }
  }

  // need proper checking against race condition
  // https://stackoverflow.com/questions/36803176/how-to-prevent-the-play-request-was-interrupted-by-a-call-to-pause-error
  private isPlaying(): boolean {
    return this.player.currentTime > 0 && !this.player.paused && !this.player.ended && this.player.readyState > 2;
  }

  private calcProgress(current: number, duration: number): number {
    if (current === 0 && duration === 0) {
      return 0;
    } else {
      return this.currentTime / this.duration * 100;
    }
  }

}
