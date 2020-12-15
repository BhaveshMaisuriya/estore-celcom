import { Pipe, PipeTransform } from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";

/**
 * Generated class for the SafeHtmlPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'safeHtml',
})
export class SafeHtmlPipe implements PipeTransform {
  constructor(
    private sanitizer: DomSanitizer
  ) {}

  transform(html) {
    const modifiedHTML = html?.replace(/\<p\>/g, `<p class="m-0">`)
    return this.sanitizer?.bypassSecurityTrustHtml(modifiedHTML);
  }

}
