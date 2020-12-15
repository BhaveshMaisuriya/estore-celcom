import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { interval } from 'rxjs/internal/observable/interval';

@Injectable({
  'providedIn': 'root'
})
export class ServiceWorkerUpdate {

  constructor(public updates: SwUpdate) {
    if (updates.isEnabled) {
      // Check for update every 10 minutes
      interval(1000 * 60 * 10).subscribe(() => updates.checkForUpdate()
        .then(() => console.log('checking for updates')));
    }
  }

  public checkForUpdates(): void {
    this.updates.available.subscribe(event => this.promptUser());
  }

  private promptUser(): void {
    console.info('updating to new version');
    this.updates.activateUpdate().then(() => document.location.reload());
  }
}