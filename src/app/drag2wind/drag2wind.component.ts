import { VideoService } from '../video/video.service';
import { Component, OnInit } from '@angular/core';

const DIAMETER = 50;

@Component({
  selector: 'dh-drag2wind',
  templateUrl: './drag2wind.component.html',
  styleUrls: ['./drag2wind.component.scss']
})
export class Drag2windComponent implements OnInit {
  visible = false;
  directionIcon: string;

  dragX = 0;
  dragY = 0;

  startX = 0;
  startY = 0;
  startTime: number;

  constructor(
    public video: VideoService
  ) { }

  ngOnInit() {
  }

  onPanStart(e) {
    this.video.pauseVideo();
    this.startX = e.center.x;
    this.startY = e.center.y;
    this.startTime = this.video.currentTime;
  }

  onPan(e) {
    this.visible = true;
    this.dragX = this.startX + e.deltaX;
    // diameter offset
    this.dragY = this.startY + e.deltaY - DIAMETER;

    if (e.additionalEvent === 'panleft') {
      this.directionIcon = 'fast_rewind';
      this.video.jumpFrames(-1);
    } else if (e.additionalEvent === 'panright') {
      this.directionIcon = 'fast_forward';
      this.video.jumpFrames(1);
    } else {
      // TODO: How to handle 'panup' or 'pandown'
      // this.video.jumpFrames(e.deltaX);
    }
  }

  onPanEnd(e) {
    this.visible = false;
  }
}
