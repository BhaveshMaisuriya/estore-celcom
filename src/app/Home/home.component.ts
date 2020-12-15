import { Component, ComponentFactoryResolver, OnInit, Renderer2, ViewChild, ViewContainerRef } from '@angular/core';
// to handle meta tags
import { Meta } from '@angular/platform-browser';
// to handle route...
import { ActivatedRoute, Router } from '@angular/router';
// import { Observable } from 'rxjs/Rx';
import { AppWidgetDirective } from '../app.widget.directive';
import { BaseComponent } from '../base.component';
import { AppComponentList } from '../component.config';
import { FooterComponent } from '../Footer/footer.component';
import { AgentFooterComponent } from '../Footer/agent-footer/agent-footer.component';
import { AddWidget } from '../Model/addwidget.model';
import { AppWidgetComponent } from '../Model/app.widget.component';
import { PageComponentListModel } from '../Model/pagecompoentlist.model';
// to handle the feedback
import { NotificationPopupEvent } from '../Service/broadcaster.service';
import { HomeService } from '../Service/home.service';
import { RedirectionService } from '../Service/redirection.service';
import { RoutesService } from "../Service/routes.service";
// import { TrackOrderComponent } from '../Store/account/track-order/track-order.component';
// import { ViewProfileComponent } from '../Store/account/view-profile/view-profile.component';
import { EStoreAnalysticsService } from '../Service/store.analytic.service';
import { CartHomeComponent } from '../Store/cart/cart-home/cart-home.component';
// Checkout component
import { CheckoutHomeComponent } from '../Store/checkout/checkout-home/checkout-home.component';
import { DeviceCatalogueComponent } from '../Store/device/device-catalogue/device-catalogue.component';
import { DeviceDetailsComponent } from '../Store/device/device-details/device-details.component';
/* Store Landing component */
import { PlanHomeComponent } from '../Store/plan/plan-home/plan-home.component';
import * as urlUtility from '../Utility/url.utility';
import { DetailBannerTextLeftComponent } from '../Widget/DetailBannerTextLeft/DetailBannerTextLeft.component';
import { HeroBannerCarouselComponent } from '../Widget/HeroBannerCarousel/herobanner.carousel.component';
import { HeroBannerImageClickableComponent } from '../Widget/HeroBannerImageClickable/hero-banner-image-clickable.component';
// import all widget...
import { ImportantNoticeComponent } from '../Widget/important-notice/important-notice.component';
import { TableComparisonComponent } from '../Widget/table-comparison/table-comparison.component';

@Component({
  selector: 'app-home-component',
  templateUrl: './home.component.html',
  providers: [HomeService, RedirectionService]
})

export class HomeComponent extends BaseComponent implements OnInit {
  public current_url: any;
  private widgetList = AppComponentList;
  private PageComponentList: Array<PageComponentListModel> = [];
  private widget: AddWidget[];
  currentAddIndex = -1;
  public isCSAgent = false;
  // handle template type
  public IsXpaxTheme = false;

  // breadcrumb..
  public BreadcrumbApiUrl = "";

  private MY_ROUTE = "MY_ROUTE";
  private MyAppRoutes: Array<any>;

  // Manage Global Notification popup
  public IsInitialized = false;
  public RedirectionInfo: any;

  @ViewChild(AppWidgetDirective, { static: false }) appDirective: AppWidgetDirective;
  private AppComponentList = [
    {
      Name: "HeroBanner Carousel",
      Key: "heroBanner_carousel",
      component: HeroBannerCarouselComponent
    },
    {
      Name: "ImportantAnnouncement",
      Key: "importantAnnouncement",
      component: ImportantNoticeComponent
    },
    {
      Name: "DatailBannerTextLeft",
      Key: "detailBanner_left",
      component: DetailBannerTextLeftComponent
    },
    {
      Name: "HeroBannerCarousel",
      Key: "herobannercarousel",
      component: HeroBannerCarouselComponent
    },
    {
      Name: "HeroBannerImageClickable",
      Key: "heroBanner_img_clickable",
      component: HeroBannerImageClickableComponent
    },
    {
      Name: "TableComparison",
      Key: "tablecomparison",
      component: TableComparisonComponent
    },
    {
      Name: "TableComparisonXPAX",
      Key: "prepaidPlan",
      component: TableComparisonComponent
    },
    {
      Name: 'footer',
      Key: 'footer',
      component: FooterComponent
    },
    {
      Name: 'agentfooter',
      Key: 'agentfooter',
      component: AgentFooterComponent
    }
  ];

  constructor(private _service: HomeService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainer: ViewContainerRef,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _routerService: RoutesService,
    private metaService: Meta,
    private notificationEvent: NotificationPopupEvent,
    private _redirectionService: RedirectionService,
    private _estoreanalyticsService: EStoreAnalysticsService,
    private renderer: Renderer2
  ) {
    super();
    this.PageComponentList = [];
    // manage dynamic route
    this.MyAppRoutes = [];
    this.RemoveLocalStorage();
    this.FindAppRoutes();
    // this.FindAdobeFromDB();
  }

  ngOnInit() {
    if (typeof window !== "undefined" && sessionStorage && sessionStorage.getItem("AgentInfo")) {
      this.isCSAgent = true;
    }
    this.RegisterTypeBroadcast();
  }

  private Init() {
    // get widget list from api..
  }
  private Bind(currentRouteInfo: any): void {
    const footerData = {
      "Api": "",
      "Name": "footer"
    };
    this._service.FindTemplateComponents(currentRouteInfo.EndPoint).subscribe((response: any) => {
      const result = response;
      result.data.component.push(footerData);
      this.FindPageComponentList(result.data.component);
      this.ManageMetaTags(result.data.metaTags);
      this.SetTemplateType(result);
    });
  }


  private SetTemplateType(result: any) {
    const template = result['SelectTemplate'];
    if (typeof window !== 'undefined' && localStorage) {
      if (template === 'xpax') {
        localStorage.setItem("TemplateType", template);
        this.IsXpaxTheme = true;
      } else {
        localStorage.setItem("TemplateType", "default");
        this.IsXpaxTheme = false;
      }
    }
  }
  // filter from appComponentList
  private FindPageComponentList(componentData) {
    componentData.forEach((item: any) => {
      if (item != null) {
        if (item.Name !== 'breadcrumb') {
          const result = this.FilterFromWidgetList(item);
          if (result !== undefined && result.length > 0) {
            this.PageComponentList.push(new PageComponentListModel(result[0].Name, result[0].component, item, false));
          }
        } else {
          this.ManageBreadcrumb(item);
        }
      }
    });
    this.widget = this.GetMyWidgets(this.PageComponentList);
    this.widget.forEach((widgetItem: AddWidget) => {
      this.LoadComponent(widgetItem);
    });
  }


  private ManageBreadcrumb(breadcrumb: any) {
    this.BreadcrumbApiUrl = breadcrumb.Api;
  }
  private ManageMetaTags(metaTags: any) {
    if (metaTags != null && metaTags.length > 0) {
      if (metaTags[0].SeoTags != null && metaTags[0].SeoTags.length > 0) {

        metaTags[0].SeoTags.forEach((seo: any) => {
          this.metaService.addTags([
            { name: seo.TagKey, content: seo.TagContent }
          ]);
        });

      }
    }
  }
  private FilterFromWidgetList(item: any) {
    return this.AppComponentList.filter((widgetItem) => {
      return (widgetItem.Key.toUpperCase() === item.Name.toUpperCase());
    });
  }

  private LoadComponent(widgetItem: AddWidget) {
    // this.currentAddIndex = (this.currentAddIndex + 1) % this.PageComponentList.length;
    // let widgetItem = this.widget[this.currentAddIndex];
    setTimeout(() => {
      // const widgetClass = widgetItem.component;
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(widgetItem.component);
      const viewContainerRef = this.appDirective.viewContainerRef;
      // viewContainerRef.clear();
      const componentRef = viewContainerRef.createComponent(componentFactory);
      (<AppWidgetComponent>componentRef.instance).data = widgetItem.data;
      componentRef.changeDetectorRef.detectChanges();
    }, 0);
  }

  private GetMyWidgets(pagecompoentlist: any) {
    const result = [];
    pagecompoentlist.forEach((item: PageComponentListModel) => {
      result.push(
        new AddWidget(item.Widget, item.Data)
      );
    });
    return result;
  }

  private FindAppRoutes() {
    this._routerService.Find().subscribe((data: any) => {
      this.ManagedynamicRoute(data.Items);
      if (data.GlobalSettings != null && data.GlobalSettings.length > 0) {
        // this.InjectHeaderFooterScript(data.GlobalSettings);
      }
    });
  }

  private FindAdobeFromDB() {
    this._routerService.FindAdobeFromDB().subscribe((data: any) => {
      // this.ManagedynamicRoute(data.Items);
      if (data.GlobalSettings != null && data.GlobalSettings.length > 0) {
        this.InjectHeaderFooterScript(data.GlobalSettings);
      }
    });
  }

  private InjectHeaderFooterScript(data: any) {
    this._service.ManageConfigurableScripts(data);
  }
  private ManagedynamicRoute(routeData) {

    this.MyAppRoutes.push({
      path: 'store/devices',
      component: DeviceCatalogueComponent,
    });

    this.MyAppRoutes.push({
      path: 'store/devicedetail/:deviceId',
      component: DeviceDetailsComponent,
    });

    this.MyAppRoutes.push({
      path: 'personal/postpaid',
      component: PlanHomeComponent,
    });

    this.MyAppRoutes.push({
      path: 'store/cart',
      component: CartHomeComponent,
    });

    this.MyAppRoutes.push({
      path: 'store/checkout',
      component: CheckoutHomeComponent,
    });

    routeData.forEach((item: any) => {
      item.alias = item.alias.substr(1);
      // adding routes explicitly to handle back button ->home
      if (item.type === "home") {
        this.MyAppRoutes.push({
          path: '',
          component: HomeComponent,
          data: { "EndPoint": item.end_point }
        });
      }

      this.MyAppRoutes.push({
        path: item.alias,
        component: HomeComponent,
        data: { "EndPoint": item.end_point }
      });
    });

    this._router.resetConfig(this.MyAppRoutes);
    this.AddRouteToLocalStorage(routeData);
  }
  private RemoveLocalStorage() {
    // if exist..
    if (typeof window !== 'undefined' && localStorage) {
      localStorage.removeItem(this.MY_ROUTE);
      localStorage.removeItem("TemplateType");
    }
  }
  private AddRouteToLocalStorage(data) {
    if (typeof window !== 'undefined' && localStorage) {
      localStorage.setItem(this.MY_ROUTE, JSON.stringify(data));
    }
    this._activatedRoute.data.subscribe((item: any) => {
      // get the current browser url to route accordingly
      this.current_url = this._router.routerState.snapshot.url;
      const currentUrl = urlUtility.getCurrentBrowserUrlWithoutQueryString(this._router.routerState.snapshot.url);
      let endPointInfo;
      // To map to the component corresponding to type as home
      const isUrlContainsHash = this.IsUrlContainsHash(currentUrl);
      const isElasticSerachUrl = this.IsElasticSearchUrl(currentUrl);
      if (isUrlContainsHash) {
        const splitResult = this.SplitHashBasedUrl(currentUrl);
        endPointInfo = this.getAPIEndPoint(data, splitResult);
      } else if (isElasticSerachUrl) {
        // navigate to elastic search component...
        this._router.navigate([currentUrl]);
      } else {
        endPointInfo = this.getAPIEndPoint(data, currentUrl);
      }

      if (endPointInfo != null) {
        this.Bind({ "EndPoint": endPointInfo.end_point });
      }
    });
  }
  /**
   * Get endpoint (api url) for respective browser url
   * if empty url "x.com/" then load homepage
   * for anyother url get endpoint
   * if endpoint not found call pagenotfound api
   * @param data
   * @param currentUrl
   */
  private getAPIEndPoint(data: any, currentUrl: string) {
    if (currentUrl === "") {
      return this.getHomePageDetails(data);
    } else {
      const pagedata = this.FindApiEndPoint(data, currentUrl);
      if (pagedata) {
        return pagedata;
      } else {
        return this.getPageNotFoundDetails(data);
      }
    }
  }
  private FindApiEndPoint(data: any, alias: string) {
    const result = data.filter((item: any) => {
      return (item.alias === alias);
    });
    return result[0];
  }
  /**
   * Method to check which is home page and route accordingly
   * if no page is mapped for type home then
   * personal page will be loaded as homepage
   * @param data
   */
  private getHomePageDetails(data: any) {
    const result = data.filter((item: any) => {
      return (item.type === "home");
    });
    if (result.length > 0) {
      return result[0];
    } else {
      return this.FindApiEndPoint(data, "personal");
    }
  }
  /**
   * get api for page not found
   * @param data
   */
  private getPageNotFoundDetails(data: any) {
    const result = data.filter((item: any) => {
      return (item.type === "page_404");
    });
    this._estoreanalyticsService.SetPageTypeForAdobeDataLayer("404", this.renderer);
    return result[0];
  }
  //

  // Content-heavy/Faq Page
  private IsUrlContainsHash(currentUrl) {
    const result: boolean = currentUrl.indexOf("#") > -1;
    return result;
  }
  private IsElasticSearchUrl(currentUrl) {
    const result: boolean = currentUrl.indexOf("search") > -1;
    return result;
  }
  private SplitHashBasedUrl(currentHashUrl) {
    let splitResult = "";
    if (currentHashUrl != null) {
      const result = currentHashUrl.split('#');
      if (result.length > 0) {
        splitResult = result[0];
      }
    }
    return splitResult;

  }
  //

  public RegisterTypeBroadcast() {
    this.notificationEvent.on().subscribe((data: any) => {
      this.ManageNotificationPopup(data);
    });
  }
  private ManageNotificationPopup(data: any): void {
    switch (data.Type) {
      case "CLOSE":
        setTimeout(() => {
          this.IsInitialized = true;
        }, 0);
        setTimeout(() => {
          this.IsInitialized = false;
        }, 0);
        break;
      case "OPEN":
        setTimeout(() => {
          this.IsInitialized = false;
        }, 0);
        setTimeout(() => {
          this.RedirectionInfo = data.Data;
          this.IsInitialized = true;
        }, 0);
        break;
    }
  }
  //

}

