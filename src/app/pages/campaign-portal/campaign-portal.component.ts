import { Component, OnInit, Renderer2, AfterViewInit, Inject, PLATFORM_ID, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EStoreAnalysticsService } from 'app/Service/store.analytic.service';
import { combineLatest } from 'rxjs';
import { untilDestroyed } from 'app/shared/services/until-destroyed.service';
import { map } from 'rxjs/internal/operators/map';
import { CampaignService } from './campaign-portal.service';
import { finalize } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { iGeneralServerResponse } from 'app/shared/models/general.model';
import { ModalService } from 'app/shared/components/modal/modal.service';
import { SYS_DOWN_MSG } from 'app/shared/constants/error.constants';

@Component({
  selector: 'app-campaign-portal',
  templateUrl: './campaign-portal.component.html',
  styleUrls: ['./campaign-portal.component.scss'],
  providers: [CampaignService],
  encapsulation: ViewEncapsulation.None,
})
export class CampaignPortalComponent implements OnInit, AfterViewInit, OnDestroy {

  isLoading = true;
  isInvalid = false;
  isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _renderer: Renderer2,
    private _estoreAnalyticsService: EStoreAnalysticsService,
    private _campaignService: CampaignService,
    private _modalService: ModalService,
    ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }
  
  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    combineLatest([
      this._activatedRoute.params,
      this._activatedRoute.queryParams,
    ]).pipe(
      untilDestroyed(this),
      map(results => {
        return {
          params: results[0],
          queryParams: results[1],
        }
      })
    )
    .subscribe(({ params, queryParams }) => {
      const {serial_num, c_id, channel, uid, UID } = queryParams;
      if (!serial_num || !c_id) {
        this.showErrorPage();
        return;
      }
      const data = {
        "principleNo": serial_num,
        "offerId": c_id,
        "channel": channel,
        "uId": uid || UID,
      }
      // this.showErrorPage();
      // return;
      this._campaignService.loadCampaign(data)
        .pipe(
          finalize(() => this.isLoading = false)
        ).subscribe(data => {
          if (data.omni_promotion_url) {
            if (this.isBrowser) {
              location.href = data.omni_promotion_url;
            }
          } else if (data?.status === false) {
            /**
             * Status number 200, but status false
             * show 404
             */
            this.showErrorPage({
              ...data,
              statusNumber: 404
            });
          } else {
            this.showErrorPage(data);
          }
        }, (_err) => {
          this.showErrorPage(_err);
        });
    });
  }

  ngAfterViewInit(): void {
    const currentUrl: string = this._router.routerState.snapshot.url;
    this._activatedRoute.data.subscribe((item: any) => {
      this._estoreAnalyticsService.ManageAnalytics(this._renderer, currentUrl, item);
    });
  }

  showErrorPage(resp: iGeneralServerResponse = null) {
    if (resp && resp?.statusNumber !== 404) {
      this._modalService.showError({message: resp?.message || SYS_DOWN_MSG});
    }
    // this._router.navigate(['**'], { skipLocationChange: true });
    this.isLoading = false;
    this.isInvalid = true;
  }

  onClickBacktoShop() {
    try {
      window.location.href = '/';
    } catch (_error) {
      
    }
  }

}
