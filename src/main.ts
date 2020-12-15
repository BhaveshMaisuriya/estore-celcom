import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from 'environments/environment';
import { akitaConfig } from '@datorama/akita';
import 'hammerjs';

akitaConfig({
  resettable: true
});

const isProd = environment.production;
if (isProd || process.env.NODE_ENV === "prod") {
  enableProdMode();
}

document.addEventListener('DOMContentLoaded', () => {
  platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .then(() => {
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("/ngsw-worker.js");
        console.log("Registered as service worker");
      }
    })
    .catch(err => console.log(err));
});
