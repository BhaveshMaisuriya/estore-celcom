import { Injectable } from '@angular/core';

@Injectable()
export class RendererService {
  /**
 * create <script> tag in renderer
 */
  private createScriptElementForRenderer(renderer) {
    const elem = renderer.createElement('script');
    return elem;
  }
  /**
   * To set property for an element using renderer
   * @param elem
   * @param propName
   * @param propValue
   */
  private setPropertyForRenderer(renderer, elem, propName, propValue) {
    renderer.setProperty(elem, propName, propValue);
  }
  /**
   * Append child for an element using renderer
   * @param parentElem
   * @param childElem
   */
  private appendChildForRenderer(renderer, parentElem, childElem) {
    renderer.appendChild(parentElem, childElem);
  }
  /**
   * Set Attribute for an element using renderer
   * @param elem
   * @param attrName
   * @param attrValue
   */
  private setAttributeForRenderer(renderer, elem, attrName, attrValue) {
    renderer.setAttribute(elem, attrName, attrValue);
  }
  /**
   * Update the innerHtml text for an element using renderer
   * @param elem
   * @param innerHTMLText
   */
  private updateTextForRenderer(document, renderer, elemId, innerHTMLText) {
    const elem = document.getElementById(elemId);
    const text = renderer.createText(innerHTMLText);
    renderer.appendChild(elem, text);
  }

  /**
  * Set Header script tag for adobe analytics
  * @param headerScript
  */
  setHeaderScriptAdobe(renderer, head, headerScript) {
    const headerElem = this.createScriptElementForRenderer(renderer);
    this.setPropertyForRenderer(renderer, headerElem, 'src', headerScript);
    // this.renderer.setAttribute(headerElem, 'id', 'adobeHeaderScript');
    this.appendChildForRenderer(renderer, head, headerElem);
  }

  /**
   * Set footer script tag for adobe analytics
   * @param footerScript
   */
  setFooterScriptAdobe(renderer, document, body, footerScript) {
    const footerElem = this.createScriptElementForRenderer(renderer);
    this.setPropertyForRenderer(renderer, footerElem, 'type', 'text/javascript');
    this.setAttributeForRenderer(renderer, footerElem, 'id', 'adobeFooterScript');
    this.appendChildForRenderer(renderer, body, footerElem);
    this.updateTextForRenderer(document, renderer, 'adobeFooterScript', footerScript);
  }
  /**
  * Create script for Adobe datalayer
  */
  createScriptForAdobeDataLayer(renderer, document, body, digitalDataResp) {
    // let newObj = {
    //   "digitalData": digitalDataResp
    // };
    const datLayerElem = this.createScriptElementForRenderer(renderer);
    this.setPropertyForRenderer(renderer, datLayerElem, 'type', 'text/javascript');
    this.setAttributeForRenderer(renderer, datLayerElem, 'id', 'digitalDataAdobe');
    this.appendChildForRenderer(renderer, body, datLayerElem);
    this.updateTextForRenderer(document, renderer, 'digitalDataAdobe', 'var digitalData =' + JSON.stringify(digitalDataResp));
  }
  /**
   * Remove the text in adobe datalayer script
   * Append the new json text
   */
  updateDataLayerScript(document, renderer, digitalDataResp) {
    // let updatedObj = {
    //   "digitalData": digitalDataResp
    // };
    if (document.getElementById('digitalDataAdobe') !== null) {
      document.getElementById('digitalDataAdobe').innerHTML = "";
      this.updateTextForRenderer(document, renderer, 'digitalDataAdobe', 'var digitalData =' + JSON.stringify(digitalDataResp));
    }
  }
  /**
  * Create script for Adobe datalayer
  */
  createTrackScriptForAdobeDataLayer(renderer, document, body, id, code) {
    const traceElement = this.createScriptElementForRenderer(renderer);
    this.setPropertyForRenderer(renderer, traceElement, 'type', 'text/javascript');
    this.setAttributeForRenderer(renderer, traceElement, 'id', id);
    this.appendChildForRenderer(renderer, body, traceElement);
    this.updateTextForRenderer(document, renderer, id, code);
  }
  /**
   * Remove the text in adobe datalayer script
   * Append the new json text
   */

  updateTraceScriptInPageLoad(document, renderer, body) {
    if (document.getElementById('traceAnalyticsInPageLoad') !== null) {
      const elem = document.getElementById('traceAnalyticsInPageLoad');
      elem.parentNode.removeChild(elem);
    }
    this.createTrackScriptForAdobeDataLayer(renderer, document, body, 'traceAnalyticsInPageLoad', " if(typeof _satellite == 'object') _satellite.track('page load');");
  }
  updateTraceScriptInAddToCart(document, renderer, body) {
    if (document.getElementById('traceAnalyticsInAddToCart') !== null) {
      const element = document.getElementById('traceAnalyticsInAddToCart');
      element.parentNode.removeChild(element);
    }
    this.createTrackScriptForAdobeDataLayer(renderer, document, body, 'traceAnalyticsInAddToCart', "if(typeof _satellite == 'object') _satellite.track('add to cart');");
  }

  createAnalyticForSelectedPurchaseType(document, renderer, body, id) {
    const traceElement = this.createScriptElementForRenderer(renderer);
    const trackType = "if(typeof _satellite == 'object') _satellite.track('selected type of purchase');" ;
    this.setPropertyForRenderer(renderer, traceElement, 'type', 'text/javascript');
    this.setAttributeForRenderer(renderer, traceElement, 'id', id);
    this.appendChildForRenderer(renderer, body, traceElement);
    this.updateTextForRenderer(document, renderer, id, trackType);
  }
}
