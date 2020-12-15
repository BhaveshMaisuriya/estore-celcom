import { Injectable } from '@angular/core';
import { HomeService } from './home.service';
import { environment } from 'environments/environment';

const FB_ID = environment.remarketKeys.fbId;
const TWITTER_ID = environment.remarketKeys.twitterId;
const GOOGLE_ID = environment.remarketKeys.googleId;
const GOOGLEPURCHASE_GTAG_ID = environment.remarketKeys.googlePurchaseGtagId;
const TWITTERPURCHASE_PID = environment.remarketKeys.twitterPurchasePid;
const GOOGLECHECKOUT_GTAG_ID = environment.remarketKeys.googleCheckoutGtagId;
const TWITTERCHECKOUT_PID = environment.remarketKeys.twitterCheckoutPid;

@Injectable()
export class RemarketAnalyticsService {

  constructor(private _homeService: HomeService) {
  }

  public LoadUniversalScripts() {
    try {
      this.AddFacebookUniversalScript(FB_ID);
      this.AddGoogleUniversalScript(GOOGLE_ID);
      this.AddTwitterUniversalScript(TWITTER_ID);
    } catch (e) {
      // Gracefully Fails
    }
  }

  public LoadPurchasePageScripts() {
    try {
      this.FacebookTrack("Purchase");
      this.GoogleGtag(GOOGLEPURCHASE_GTAG_ID);
      this.TwitterTrackPid(TWITTERPURCHASE_PID);
    } catch (e) {
      // Gracefully Fails
    }
  }
  public LoadCheckoutPageScripts() {
    try {
      this.FacebookTrack("InitiateCheckout");
      this.GoogleGtag(GOOGLECHECKOUT_GTAG_ID);
      this.TwitterTrackPid(TWITTERCHECKOUT_PID);
    } catch (e) {
      // Gracefully Fails
    }
  }
  public LoadOnClickScripts(analyticsKey) {
    try {
      this.FacebookTrack(analyticsKey.FB_ID);
      this.GoogleGtagConversion(analyticsKey.GOOGLE_GTAG_ID);
      this.TwitterTrackPid(analyticsKey.TWITTER_PID);
    } catch (e) {
      // Gracefully Fails
    }
  }
  private AddFacebookUniversalScript(fbId: string): void {
      const facebookHeadFunctionScript = `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '` + fbId + `');
                fbq('track', 'PageView');`;
      const facebookHeadImgScript = `
                <img height="1" width="1" style="display:none"
                src="https://www.facebook.com/tr?id=` + fbId + `&ev=PageView&noscript=1"/>`;
      const fbScriptObj = [];
      fbScriptObj.push({
        type: 'header_script_block',
        value: facebookHeadFunctionScript
      });
      fbScriptObj.push({
        type: 'body_noscript_block',
        value: facebookHeadImgScript
      });
      this._homeService.ManageConfigurableScripts(fbScriptObj);
  }

  private AddGoogleUniversalScript(googleId: string): void {
      const googeHeadScript = `
          <script async src="https://www.googletagmanager.com/gtag/js?id=` + googleId + `"></script>`;
      const googeHeadFunctionScript = `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '` + googleId + `');`;
      const googleScriptObj = [];
      googleScriptObj.push({
          type: 'header_script',
          value: googeHeadScript
      });
      googleScriptObj.push({
        type: 'header_script_block',
        value: googeHeadFunctionScript
      });
      this._homeService.ManageConfigurableScripts(googleScriptObj);
  }

  private AddTwitterUniversalScript(twitterId: string): void {
      const twitterHeadFunctionScript = `
          !function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);
          },s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,u.src='//static.ads-twitter.com/uwt.js',
          a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,'script');
          twq('init','` + twitterId + `');
          twq('track','PageView');`;
      const twitterHeadScript = `<script src="//platform.twitter.com/oct.js" type="text/javascript"></script>`;
      const twitterScriptObj = [];
      twitterScriptObj.push({
          type: 'header_script_block',
          value: twitterHeadFunctionScript
      });
      twitterScriptObj.push({
        type: 'header_script',
        value: twitterHeadScript
    });
      this._homeService.ManageConfigurableScripts(twitterScriptObj);
  }

  public FacebookTrack(action: string): void {
    (<any>window).fbq('track', action);
  }

  public GoogleGtag(gtagId: string): void {
    (<any>window).gtag('event', 'conversion', {
      'send_to': GOOGLE_ID + '/' + gtagId,
      'transaction_id': ''
    });
  }
  public GoogleGtagConversion(gtagId: string, url?: string): void {
    const callback = () => {
      if (typeof(url) !== 'undefined') {
        (<any>window).location = url;
      }
    };
    (<any>window).gtag('event', 'conversion', {
        'send_to': GOOGLE_ID + '/' + gtagId,
        'event_callback': callback
    });
  }

  public TwitterTrackPid(pId: string): void {
    if ((<any>window).twttr) {
      (<any>window).twttr.conversion.trackPid(pId, { tw_sale_amount: 0, tw_order_quantity: 0 });
      const twitterHeadImgScript = `
      <img height="1" width="1" style="display:none;" alt=""
      src="https://analytics.twitter.com/i/adsct?txn_id=` + pId + `&p_id=Twitter&tw_sale_amount=0&tw_order_quantity=0" />
      <img height="1" width="1" style="display:none;" alt=""
      src="//t.co/i/adsct?txn_id=` + pId + `&p_id=Twitter&tw_sale_amount=0&tw_order_quantity=0" />`;
      const twitterScriptObj = [];
      twitterScriptObj.push({
          type: 'body_noscript_block',
          value: twitterHeadImgScript
      });
      this._homeService.ManageConfigurableScripts(twitterScriptObj);
    }
  }
}



