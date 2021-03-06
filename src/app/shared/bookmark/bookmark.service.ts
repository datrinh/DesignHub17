import { BehaviorSubject, Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';

export interface Bookmark {
  id: number;
  timestamp: number;
  title: string;
  type: string;
}

@Injectable()
export class BookmarkService {

  bookmarkStore: Bookmark[] = [];

  private bookmarks: BehaviorSubject<Bookmark[]> = new BehaviorSubject<Bookmark[]>(this.bookmarkStore);
  bookmarks$: Observable<Bookmark[]> = this.bookmarks.asObservable();

  constructor() { }

  getBookmark(id: number): Bookmark {
    return this.bookmarkStore.find((item) => item.id === id);
  }

  createBookmark(timestamp: number, title: string) {
    this.bookmarkStore.push({
      id: this.bookmarkStore.length,
      timestamp: timestamp,
      title: title,
      type: 'bookmark'
    });
    this.bookmarks.next(this.bookmarkStore);
    // console.log(this.bookmarkStore);
  }

  editBookmark(id: number, newVal: string) {
    const index = this.bookmarkStore.indexOf(this.getBookmark(id));
    this.bookmarkStore[index].title = newVal;
    this.bookmarks.next(this.bookmarkStore);
  }

  deleteBookmark(id: number) {
    this.bookmarkStore = this.bookmarkStore.filter((item) => id !== item.id);
    this.bookmarks.next(this.bookmarkStore);
  }

}
