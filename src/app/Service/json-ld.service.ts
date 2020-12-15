import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JsonLdService {

  constructor(
    @Inject(DOCUMENT) private _document: Document,
  ) {
  }

  public addStructuredDataJson(renderer: Renderer2, data: any, script_id = 'device-detail'): void {
    let script;
    script = this._document.querySelector(`#${script_id}`);
    if (!script) {
      script = renderer.createElement('script');
    }
    script.type = 'application/ld+json';
    script.text = `${JSON.stringify(data)}`;
    script.id = script_id;
    renderer.appendChild(this._document.body, script);
  }
}
