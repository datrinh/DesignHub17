import { VideoService } from '../../video/video.service';
import { BookmarkService } from '../../shared/bookmark.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dh-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  constructor(
    public bookmarks: BookmarkService,
    private video: VideoService
  ) { }

  ngOnInit() {
  }

  jumpToTimestamp(timestamp: number) {
    this.video.player.currentTime = timestamp;
    this.video.player.pause();
  }

}
