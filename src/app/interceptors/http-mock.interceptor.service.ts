import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import * as deviceDetails from '../json/device-detail.json';
import * as deviceDetailsOmni from '../json/device-detail-omni.json';
import * as vivoOmni from '../json/vivo-omni.json';
import * as eligibility from '../json/upgrade-plan-eligibility.json';
import * as eligibility_device from '../json/device-bundle-eligibility.json';
import * as preorder from '../json/Samsung-Galaxy-S9-preorder.json';
import * as cartmine from '../json/cartmine-cobp.json';
import * as samsung from '../json/Samsung-Galaxy-Note-10-Plus.json';
import * as iphone from '../json/iPhone-XS-Max.json';
import * as iphone7 from '../json/iPhone-7.json';
import * as Note20UltraPreorder from '../json/Note-20-ultra-preorder.json';
import * as Note20UltraBronzeStock from '../json/Note-20-ultra-preorder-bronze-stock.json';
import * as mnp from '../json/mnp-eligibility.json';
import * as entplan from '../json/enterprise-plan.json';
import * as cobpultra from '../json/cobp-ultra.json';
import * as cobpEasyphone from '../json/cobp-easyphone.json';
import * as A80 from '../json/Samsung-Galaxy-A80.json';
import * as mate10 from '../json/Huawei-Mate-10.json';
import * as xplite from '../json/xp-lite.json';
import * as xpliteOmni from '../json/xp-lite-omni.json';
import * as xpax from '../json/prepaid-xpax.json';
import * as xpax_mviva from '../json/prepaid-xpax-clm.json';
import * as instock from '../json/instock.json';
import * as numbers from '../json/numbers.json';
import * as footer from '../json/footer.json';
import * as globnav from '../json/globnav.json';
import * as shopDevices from '../json/shop-devices.json';
import * as cobpEnterprise from '../json/cobp-enterprise.json';
import * as sentotp from '../json/sent-otp.json'
import * as mega from '../json/mega.json'
import * as mega_mviva from '../json/mega-mviva.json'
import * as familyLinePlan from '../json/family-line-plan.json';
import * as familyLineOmni from '../json/family-line-plan-omni.json';
import * as familyLineElig from '../json/family-line-plan-eligiblity.json';
import * as campaignOmni from '../json/campaign-omni.json';
import * as megaOmni from '../json/mega-omni.json';
import * as gameEligibility from '../json/gamification-eligibility.json';
import * as ekycOkayId from '../json/ekyc-okayId.json';
import * as customerdetail from '../json/customer-detail.json';
import * as premiumDelivery from '../json/premium-delivery-eligibility.json';
import * as prepaidDynamicSim from '../json/prepaid-dynamic-sim.json';
import * as deviceDetailsCombo from '../json/devices/iPhone-XS.json';
import * as iphoneCombo from '../json/devices/combo-iPhone-XS.json';
import * as seoMetaTagsHome from '../json/seoMetaTags.json';

import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

const estore_domain = 'https://estore-02.celcom.com.my';

const urls = [
    {
        url: `${estore_domain}/rest/V1/seodata/home`,
        json: seoMetaTagsHome
    },
    {
        url: `${estore_domain}/rest/V1/magorderdetail/1-136106398988`,
        json: premiumDelivery
    },
    {
        url: `${estore_domain}/rest/V1/customerdetail?msisdn=0136318060`,
        json: customerdetail
    },
    {
        url: `${estore_domain}/rest/V1/ultraplanproductview/mega?promotiondetails=mega-for-unlimited-m`,
        json: mega_mviva
    },
    {
        url: `${estore_domain}/rest/V1/gamificationEligibility`,
        json: gameEligibility
    },
    {
        url: `${estore_domain}/rest/V1/ekyc/id`,
        json: ekycOkayId
    },
    {
        url: `${estore_domain}/rest/V1/ultraplanproductview/mega`,
        json: mega
    },
    {
        url: `${estore_domain}/rest/V1/devicedetails/Huawei-P20?promotionomnichannel=clmomni&id=Aks+cLDmdqYzaTVubJ14QNpZRR991G50V3aKuprOmZw=`,
        json: deviceDetailsOmni
    },
    {
        url: `${estore_domain}/rest/V1/devicedetails/Huawei-P20?promotionomnichannel=clmomni`,
        json: deviceDetailsOmni
    },
    {
        url: `${estore_domain}/rest/V1/prepaidproductview/family-line?promotionomnichannel=clmomni&id=Aks+cLDmdqYzaTVubJ14QNpZRR991G50V3aKuprOmZw=`,
        json: familyLineOmni
    },
    {
        url: `${estore_domain}/rest/V1/prepaidproductview/family-line?promotionomnichannel=clmomni`,
        json: familyLineOmni
    },
    {
        url: `${estore_domain}/rest/V1/devicedetails/Vivo-V9?promotionomnichannel=clmomni&id=2zt0LPghrbVGBtF5HTgAzLzS0rxRi7/4h2Fgy5 80tU=&uId=srYXtx/vtOZeRiL40dadN2takFwx8dOI/aC8/e26zp8=&channel=Cc8w6mfonjpxGelr0HLKwg==`,
        json: vivoOmni
    },
    {
        url: `${estore_domain}/rest/V1/devicedetails/Huawei-P20`,
        json: deviceDetails
    },
    {
        url: `${estore_domain}/rest/V1/devicedetails/iPhone-XS`,
        json: deviceDetailsCombo
    },
    {
        url: `${estore_domain}/rest/V1/devicedetails-combo/iPhone-XS`,
        json: iphoneCombo,
        delay: 2000,
    },
    {
        url: `${estore_domain}/rest/V1/upgradePlan/?easy_phone=1&device_sku=HuaweiP20128GBPink`,
        json: eligibility
    },
    {
        url: `${estore_domain}/rest/V1/upgradePlan/?easy_phone=0&pre_order=1&device=1&mviva=0&device_sku=HuaweiP20128GBPink`,
        json: eligibility
    },
    {
        url: `${estore_domain}/rest/V1/upgradePlan/?easy_phone=0&pre_order=0&device=0&mviva=0&device_sku=`,
        json: eligibility_device
    },
    {
        url: `${estore_domain}/rest/V1/devicedetails/Samsung-Galaxy-S9`,
        json: preorder
    },
    {
        url: `${estore_domain}/rest/V1/cartmine`,
        json: cartmine
    },
    {
        url: `${estore_domain}/rest/V1/devicedetails/Samsung-Galaxy-Note-10-Plus`,
        json: samsung
    },
    {
        url: `${estore_domain}/rest/V1/devicedetails/iPhone-XS-Max`,
        json: iphone
    },
    {
      url: `${estore_domain}/rest/V1/devicedetails/samsung-galaxy-note-20-ultra`,
      json: Note20UltraPreorder
    },
    {
      url: `${estore_domain}/rest/V1/stock-check/SamsungGalaxyNote20Ultra256GBBronze`,
      json: Note20UltraBronzeStock
    },
    {
        url: `${estore_domain}/rest/V1/devicedetails/Huawei-Mate-20`,
        json: mate10
    },
    {
        url: `${estore_domain}/rest/V1/devicedetails/Samsung-Galaxy-A80`,
        json: A80
    },
    {
        url: `${estore_domain}/rest/V1/eligibilitycheck?msisdn_number=0169019007&id_number=860821543221&id_type=1&sku=mega&bundle=0&is_cs_agent=0`,
        json: mnp
    },
    {
        url: `${estore_domain}/rest/V1/planproductlist/4/0?agenttype=enterprise`,
        json: entplan
    },
    {
        url: `${estore_domain}/rest/V1/devicedetails/iPhone-7`,
        json: iphone7
    },
    {
        url: `${estore_domain}/rest/V1/stock-check/HuaweiNova5T128GBPurple`,
        json: instock
    },
    {
        url: `${estore_domain}/rest/V1/upgradePlan/?easy_phone=0&pre_order=0&device=0&mviva=0&device_sku=`,
        json: cobpultra,
        delay: 2000,
    },
    {
        url: `${estore_domain}/rest/V1/upgradePlan/?easy_phone=1&device_sku=hm10moc64GB`,
        json: cobpEasyphone,
        delay: 2000,
    },
    {
        url: `${estore_domain}/rest/V1/autobillcheck?sku=mega&typeOfPurchase=COBP&actionType=7&msisdn=0132087679`,
        json: [
            {
                "status": true,
                "bill_type": "2"
            }
        ]
    },
    {
        url: `${estore_domain}/rest/V1/project-moon-details/xp-lite`,
        json: xplite,
        delay: 2000,
    },
    {
        url: `${estore_domain}/rest/V1/project-moon-details/xp-lite?promotionomnichannel=clmomni`,
        json: xpliteOmni,
        delay: 1000,
    },
    {
        url: `${estore_domain}/rest/V1/planproductview/Xpax`,
        json: xpax,
        delay: 200,
    },
    {
        url: `${estore_domain}/rest/V1/prepaidproductview/Xpax?promotiondetails=LazadaXpax`,
        json: xpax_mviva,
        delay: 200,
    },
    {
        url: `${estore_domain}/rest/V1/prepaidproductview/xpax?campaignCode=PersonalizedPreCampaign`,
        json: prepaidDynamicSim,
        delay: 200,
    },
    {
        url: `${estore_domain}/rest/V1/retrieve-number`,
        json: numbers,
        delay: 200,
    },
    {
        url: `${estore_domain}/rest/V1/shopdevices`,
        json: shopDevices,
        delay: 1,
    },
    {
        url: `${estore_domain}/api/content_details?_format=hal_json&type=custom&name=menu_details&id=global-navigation`,
        json: globnav,
        delay: 1,
    },
    {
        url: `${estore_domain}/api/content_details?_format=hal_json&type=custom&name=menu_details&id=footer`,
        json: footer,
        delay: 1,
    },
    {
        url: `${estore_domain}/rest/V1/upgradePlan/?easy_phone=0&pre_order=0&device=1&mviva=0&device_sku=oppf5gld32gb`,
        json: cobpEnterprise,
        delay: 1,
    },
    {
        url: `${estore_domain}/rest/V1/sentOtp`,
        json: sentotp,
        delay: 1,
    },
    {
        url: `${estore_domain}/rest/V1/prepaidproductview/family-line`,
        json: familyLinePlan,
        delay: 1,
    },
    {
        url: `${estore_domain}/rest/V1/familylineligibilitycheck/0133748272`,
        json: familyLineElig,
        delay: 1,
    },
    {
        url: `${estore_domain}/rest/V1/omnichanneloffervalidate`,
        json: campaignOmni,
        delay: 10000,
    },
    {
        url: `${estore_domain}/rest/V1/ultraplanproductview/mega?promotionomnichannel=clmomni&id=Aks+cLDmdqYzaTVubJ14QNpZRR991G50V3aKuprOmZw=`,
        json: megaOmni
    },
];

@Injectable()
export class HttpMockRequestInterceptor implements HttpInterceptor {
    constructor() {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const resp = urls.find(el => el.url == request.urlWithParams);
        if (resp) {
            console.info('Intercepted', request.urlWithParams);
            return of(new HttpResponse({ status: 200, body: (resp.json['default'] || resp.json) }))
                .pipe(delay(+resp['delay'] || 0));
        }
        return next.handle(request);
    }
}
