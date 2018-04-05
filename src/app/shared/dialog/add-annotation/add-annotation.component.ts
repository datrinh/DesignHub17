import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { SHAPE_LIST } from '../../shape/shape.service';
import { AudioCommentService } from '../../audio-comment/audio-comment.service';
import { AnnotationService } from '../../annotation/annotation.service';

@Component({
  selector: 'dh-add-annotation',
  templateUrl: './add-annotation.component.html',
  styleUrls: ['./add-annotation.component.scss']
})
export class AddAnnotationComponent implements OnInit {
  shapes = SHAPE_LIST;
  timestamp: number;
  selectedShape;
  duration = 0;
  durationInterval;
  tempRec;
  // audioPaused: boolean;
  recStatus;
  inputLabel = 'Titel';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private annotation: AnnotationService,
    private audio: AudioCommentService,
    public dialogRef: MatDialogRef<AddAnnotationComponent>
  ) { }

  ngOnInit() {
    this.timestamp = this.data.timestamp;
    this.audio.tempRecordSub$.subscribe((record) => {
      this.tempRec = record;
      // this.audioPaused = record.audio.paused;
    });
    this.audio.status$.subscribe((status) => {
      this.recStatus = status;
    });
  }

  select(shape) {
    this.selectedShape = shape;
  }

  play() {
    this.audio.playTempRecord();
  }

  stop() {
    this.audio.stopTempRecord();
  }

  startRec() {
    this.inputLabel = this.duration.toString();
    this.durationInterval = window.setInterval(() => {
      this.duration++;
    }, 1000);
    this.audio.startRecording();
  }

  stopRec() {
    window.clearInterval(this.durationInterval);
    this.audio.stopRecording();
  }

  onSubmit(title: string, shape) {
    this.dialogRef.close({
      title: title,
      icon: shape.icon
    });
  }

}
