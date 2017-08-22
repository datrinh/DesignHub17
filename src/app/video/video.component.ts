import { VideoService } from './video.service';
import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'dh-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoComponent implements OnInit {
  // source = 'assets/video.mp4';
  source = 'https://media.w3.org/2010/05/bunny/movie.mp4';

  @ViewChild('video') video;

  constructor(public videoService: VideoService) { }

  ngOnInit() {
    this.videoService.player = this.video.nativeElement;
  }

  onTimeUpdate(e) {
    this.videoService.currentTime = e.srcElement.currentTime;
  }

  onDurationChange(e) {
    this.videoService.duration = e.srcElement.duration;
  }
}
