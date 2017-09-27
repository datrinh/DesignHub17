import { BehaviorSubject, Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';

export enum ActionMode {
  bookmark = 'bookmark',
  audio = 'audio',
  shape = 'shape'
}

const DEFAULT_MODE = ActionMode.bookmark;

@Injectable()
export class ActionService {

  private mode: BehaviorSubject<string> = new BehaviorSubject<string>(DEFAULT_MODE);
  mode$: Observable<string> = this.mode.asObservable();

  constructor() { }

  setMode(mode: string) {
    this.mode.next(mode);
  }

}
