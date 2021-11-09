import { Subject } from 'rxjs';
import { Component, OnDestroy } from '@angular/core';

@Component({
  template: ''
})
export class BaseComponent implements OnDestroy {
  ngUnsubscribe = new Subject<void>();

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}