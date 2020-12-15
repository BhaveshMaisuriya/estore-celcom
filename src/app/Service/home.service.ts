import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { BaseService } from '../base.service';
import { AppService } from '../Service/app.service';

@Injectable()
export class HomeService extends BaseService {
  constructor(private _service: AppService) {
    super();
  }

  public FindTemplateComponents(endPoint: string): Observable<any[]> {

    const url = "/" + endPoint;

    return this._service
      .get(url)
      .pipe(map((response: any) => {
        return response;
      }));
  }

  public FindApiEndPointInformation(data: any, alias: string) {
    let result = data.filter((item: any) => {
      return (item.alias == alias)
    });
    return result[0];
  }
  public ManageConfigurableScripts(data: any) {
    data.forEach((item: any) => {
      const scriptType = item.type.toLowerCase();
      const splitResult = item.value.split(','); // '<script>alert("hi");</script>/n<script src="temp"></script>'.split('/n');
      if (scriptType === "header_script") {
        if (typeof document !== 'undefined') {
          const head = document.getElementsByTagName('head').item(0);
          this.AppendHeaderScript(head, splitResult);
        }
      }
      if (scriptType === "header_script_block") {
        if (typeof document !== 'undefined') {
          const head = document.getElementsByTagName('head').item(0);
          this.AppendHeaderScriptBlock(head, item.value);
        }
      }
      if (scriptType === "header_script_product_offer_block") {
        if (typeof document !== 'undefined') {
          const head = document.getElementsByTagName('head').item(0);
          this.AppendHeaderScriptProductOfferBlock(head, item.value);
        }
      }
      if (scriptType === "header_noscript_block") {
        if (typeof document !== 'undefined') {
          const head = document.getElementsByTagName('head').item(0);
          this.AppendNoScriptBlock(head, item.value);
        }
      }
      // body noscript blok
      if (scriptType === "body_noscript_block") {
        if (typeof document !== 'undefined') {
          const body = document.getElementsByTagName('body').item(0);
          this.AppendNoScriptBlock(body, splitResult);
        }
      }
      // footer_script
      if (scriptType === "footer_script") {
        if (typeof document !== 'undefined') {
          const body = document.getElementsByTagName('body').item(0);
          this.AppendHeaderScript(body, splitResult);
        }
      }
      if (scriptType === 'affiliate_script') {
        if (typeof document !== 'undefined') {
          const body = document.getElementsByTagName('body').item(0);
          this.AppendHeaderScript(body, [item.value]);
        }
      }
    });
  }
  private AppendHeaderScript(selector, arr) {
    this.AppendScript(selector, arr);
  }
  private AppendBodyScript(selector, arr) {
    this.AppendScript(selector, arr);
  }
  private AppendScript(selector, arr) {
    var content = arr;
    for (var i = 0; i < content.length; i++) {
      var _content = content[i];
      var js = _content.indexOf('script');
      var src = _content.indexOf('src=');
      // Script tag.
      if (js > -1) {
        var inline = '';
        if (typeof document !== 'undefined') {
          var script = document.createElement('script');
          script.type = 'text/javascript';
        }
        if (src > -1) {
          let url = '';
          _content.replace(/src ?= ?"([^"]+)"/gi, function (res) {
            url = res;
            url = url.replace('src=', '');
            url = url.replace(/['"]+/g, '');
            url = url.replace(/["']+/g, '');
          });
          script.src = url;
        } else {
          _content.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, function () {
            inline += arguments[1] + '\n';
          });
          script.text = inline;
        }
        selector.appendChild(script);
      } else {
        selector.innerHTML += _content;
      }
    }
  }
  /*
  * Appending script block.
  * @param1 html selector.
  * @param2 script block to be appended.
  */
  private AppendHeaderScriptBlock(selector, arr) {
    let script;
    if (typeof document !== 'undefined') {
      script = document.createElement('script');
      script.type = 'text/javascript';
    }
    script.innerHTML = arr;
    selector.appendChild(script);
  }
  /*
  * Appending script block.
  * @param1 html selector.
  * @param2 script block to be appended.
  */
  private AppendHeaderScriptProductOfferBlock(selector, arr) {
    let headerScriptProduct;
    if (typeof document !== 'undefined') {
      headerScriptProduct = document.createElement('script');
      headerScriptProduct.type = 'application/ld+json';
    }
    headerScriptProduct.innerHTML = arr;
    selector.appendChild(headerScriptProduct);
  }

  /*
  * Appending noscript block.
  * @param1 html selector.
  * @param2 noscript block to be appended.
  */
  private AppendNoScriptBlock(selector, arr) {
    let noscript;
    if (typeof document !== 'undefined') {
      noscript = document.createElement('noscript');
    }
    noscript.innerHTML = arr;
    selector.appendChild(noscript);
  }
}
