import { Injectable } from '@angular/core';

declare var MediaRecorder: any;

export interface AudioComment {
  id: number;
  blob: Blob;
  timestamp: number;
  link: string;
}

@Injectable()
export class AudioCommentService {
  store: AudioComment[] = [];

  stopped = true;
  downloadLink: any = {};
  player;

  mediaRecorder;

  constructor() {
    // navigator.mediaDevices.getUserMedia({ audio: true, video: false })
    // .then((stream) => this.onRecSuccess(stream));
  }

  init() {
    navigator.mediaDevices.getUserMedia({ audio: true, video: false })
    .then(stream => this.onRecSuccess(stream));
  }

  onRecSuccess(stream) {
    console.log(stream);
    const options = {mimeType: 'video/webm;codecs=vp9'};
    const recordedChunks = [];
    this.mediaRecorder = new MediaRecorder(stream, options);

    this.mediaRecorder.ondataavailable = (e) => {
      console.log('data available!');
      if (e.data.size > 0) {
        recordedChunks.push(e.data);
      }
    };

    this.mediaRecorder.onstop = () => {
      this.downloadLink.href = URL.createObjectURL(new Blob(recordedChunks));
      this.downloadLink.download = 'acetest.wav';
      const audio = new Audio();
      audio.src = this.downloadLink.href;
      audio.load();
      audio.play();
      console.log('stop', this.downloadLink);
    };

    // mediaRecorder.start();
    console.log(this.mediaRecorder);
  }

  startRecording() {
    this.stopped = false;
    this.mediaRecorder.start();
  }

  stopRecording() {
    this.mediaRecorder.stop();
    this.stopped = true;
  }

}
