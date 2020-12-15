import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
import {Injectable } from '@angular/core';
import { AnalyticsService } from './analytic.service';

@Injectable()
export class SeoService {

  constructor(private title: Title, private meta: Meta, private analytics: AnalyticsService) { }

  /**
   * Method to set title inside the head tag
   * @param title
   * @param setAnalytics - Whether to set Adobe analytics or not
   */
  setTitle(title: string, setAnalytics = false): SeoService {
    this.title.setTitle(title);

    if (setAnalytics) {
      this.analytics.pageName = title;
    }
    return this;
  }

  /**
   * Method to update the meta tag inside the head
   * @param name
   * @param content
   */
  setMetaData(name: string,content: string): SeoService {
    this.meta.updateTag({
      name: name,
      content: content
    });
    return this;
  }

  /**
   * Method to remove the meta tag
   * @param name
   */
  removeMetaData(name:string): SeoService {
    this.meta.removeTag(name);
    return this;
  }

  /* Added for Open graph Implementation */
  updateTitle(title: string){
    this.title.setTitle(title);
  }

  updateMetaTags(metaTags: MetaDefinition[]){
    metaTags.forEach(m=> this.meta.updateTag(m));
  }
}
