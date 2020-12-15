import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Broadcaster} from '../Model/broadcaster.model';

@Injectable()
export class NotificationPopupEvent {
  constructor(private broadcaster: Broadcaster) {}

  fire(data: any): void {
    this.broadcaster.broadcast(NotificationPopupEvent, data);
  }

  on(): Observable<any> {
    return this.broadcaster.on<any>(NotificationPopupEvent);
  }
}
