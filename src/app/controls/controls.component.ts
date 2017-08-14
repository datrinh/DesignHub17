import { VideoService } from '../video/video.service';
import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';

@Component({
  selector: 'dh-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent implements OnInit {
  constructor(private videoService: VideoService) { }

  ngOnInit() {
  }
}
