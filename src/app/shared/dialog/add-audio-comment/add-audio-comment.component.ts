import { AudioCommentService } from '../../audio-comment/audio-comment.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'dh-add-audio-comment',
  templateUrl: './add-audio-comment.component.html',
  styleUrls: ['./add-audio-comment.component.scss']
})
export class AddAudioCommentComponent implements OnInit {
  timestamp: number;
  duration = 0;
  durationInterval;
  tempRec = null;
  status;

  constructor(
    private audio: AudioCommentService,
    @Inject(MD_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.timestamp = this.data.timestamp;
    this.audio.tempRecordSub$.subscribe((record) => {
      this.tempRec = record;
    });
    this.audio.status$.subscribe((status) => {
      this.status = status;
    });
  }

  play() {
    this.audio.playTempRecord();
  }

  startRec() {
    this.durationInterval = window.setInterval(() => {
      this.duration++;
    }, 1000);
    this.audio.startRecording();
  }

  stopRec() {
    window.clearInterval(this.durationInterval);
    this.audio.stopRecording();
  }

}
