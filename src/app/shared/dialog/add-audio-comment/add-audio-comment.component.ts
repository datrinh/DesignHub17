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

  constructor(
    private audio: AudioCommentService,
    @Inject(MD_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.timestamp = this.data.timestamp;
  }

  play() {
    this.audio.playRecord(this.audio.audioStore[this.audio.audioStore.length - 1].link);
  }

}
