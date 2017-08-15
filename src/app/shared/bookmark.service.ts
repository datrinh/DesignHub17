import { BehaviorSubject, Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';

export interface Bookmark {
  id: number;
  timestamp: number;
  title: string;
}

@Injectable()
export class BookmarkService {

  bookmarkStore: Bookmark[] = [];

  bookmarks: BehaviorSubject<Bookmark[]> = new BehaviorSubject<Bookmark[]>(this.bookmarkStore);
  bookmarks$: Observable<Bookmark[]> = this.bookmarks.asObservable();

  constructor() { }

  getBookmark(id: number): Bookmark {
    return this.bookmarkStore.find((item) => item.id === id);
  }

  createBookmark(timestamp: number, title: string) {
    this.bookmarkStore.push({id: this.bookmarkStore.length, timestamp: timestamp, title: title});
    this.bookmarks.next(this.bookmarkStore);
    console.log(this.bookmarkStore);
  }

  deleteBookmark(bookmark: Bookmark) {
    this.bookmarkStore.filter((item) => bookmark.id !== item.id);
  }

}
