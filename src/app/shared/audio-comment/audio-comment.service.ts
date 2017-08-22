import { BehaviorSubject, Observable } from 'rxjs/Rx';
import { VideoService } from '../../video/video.service';
import { Injectable } from '@angular/core';

declare var MediaRecorder: any;

export interface AudioComment {
  id: number;
  audio: HTMLAudioElement;
  timestamp: number;
  // link: string;
  // duration: number;
}

@Injectable()
export class AudioCommentService {
  audioStore: AudioComment[] = [];
  stopped = true;
  mediaRecorder;

  audioComments: BehaviorSubject<AudioComment[]> = new BehaviorSubject<AudioComment[]>(this.audioStore);
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
      const newAudio: AudioComment = {
        id: this.audioStore.length,
        audio: audio,
        timestamp: this.video.currentTime
        // link: URL.createObjectURL(blob)
      };
      // preemptive push
      this.audioStore.push(newAudio);
      // clear chunks
      recordedChunks = [];

      console.log('stop', newAudio);
    };
  }

  startRecording() {
    this.stopped = false;
    this.mediaRecorder.start();
  }

  stopRecording() {
    this.mediaRecorder.stop();
    this.stopped = true;
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

}
