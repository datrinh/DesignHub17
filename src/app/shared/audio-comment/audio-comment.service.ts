import { BehaviorSubject, Observable } from 'rxjs/Rx';
import { VideoService } from '../../video/video.service';
import { Injectable } from '@angular/core';

declare var MediaRecorder: any;

export interface AudioComment {
  id: number;
  audio: HTMLAudioElement;
  timestamp: number;
  type: string;
  // link: string;
  // duration: number;
}

@Injectable()
export class AudioCommentService {
  audioStore: AudioComment[] = [];
  stopped = true;
  mediaRecorder;
  tempRecord: AudioComment = null;

  private status: BehaviorSubject<string> = new BehaviorSubject<string>('start');
  status$: Observable<string> = this.status.asObservable();

  private tempRecordSub: BehaviorSubject<AudioComment> = new BehaviorSubject<AudioComment>(this.tempRecord);
  tempRecordSub$: Observable<AudioComment> = this.tempRecordSub.asObservable();

  private audioComments: BehaviorSubject<AudioComment[]> = new BehaviorSubject<AudioComment[]>(this.audioStore);
  audioComments$: Observable<AudioComment[]> = this.audioComments.asObservable();

  constructor(
    private video: VideoService
  ) { }

  init() {
    navigator.mediaDevices.getUserMedia({ audio: true, video: false })
    .then(stream => this.onRecSuccess(stream));
  }

  onRecSuccess(stream) {
    const options = {mimeType: 'video/webm;codecs=vp9'};
    let recordedChunks = [];
    this.mediaRecorder = new MediaRecorder(stream, options);

    this.mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        recordedChunks.push(e.data);
      }
    };

    this.mediaRecorder.onstop = () => {
      const blob = new Blob(recordedChunks);
      const audio = new Audio();
      const source = URL.createObjectURL(blob);
      audio.src = source;
      this.tempRecord = {
        id: this.audioStore.length,
        audio: audio,
        timestamp: this.video.currentTime,
        type: 'audio'
      };
      this.tempRecordSub.next(this.tempRecord);
      // clear chunks
      recordedChunks = [];
      console.log(this.tempRecord);
    };
  }

  startRecording() {
    this.stopped = false;
    this.status.next('recording');
    this.mediaRecorder.start();
  }

  stopRecording() {
    this.mediaRecorder.stop();
    this.status.next('done');
    this.stopped = true;
  }

  saveRecord() {
    this.audioStore.push(this.tempRecord);
    this.audioComments.next(this.audioStore);
    this.tempRecordSub.next(null);
    this.status.next('start');
  }

  deleteRecord(id: number) {
    this.audioStore = this.audioStore.filter(item => id !== item.id);
    this.audioComments.next(this.audioStore);
  }

  deleteLastRecord() {
    this.audioStore.pop();
    this.audioComments.next(this.audioStore);
  }

  playRecord(source: string) {
    const audio = new Audio();
    audio.src = source;
    audio.load();
    audio.play();
  }

  playTempRecord() {
    this.playRecord(this.tempRecord.audio.src);
  }

  reset() {
    this.status.next('start');
    this.mediaRecorder.stop();
  }

}
