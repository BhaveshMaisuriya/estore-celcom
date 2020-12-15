import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseComponent } from '../../../base.component';
import { ContentNavigation } from '../../../Model/contentnavigation.model'
import { ActivatedRoute, Router } from '@angular/router';
import { RedirectionService } from '../../../Service/redirection.service';
import { CompareBannerService } from '../compare-hero-banner/compare-banner.service';

@Component({
	selector: 'app-compare-hero-banner',
	templateUrl: './compare-hero-banner.component.html',
	styleUrls: ['./compare-hero-banner.component.css'],
	providers: [CompareBannerService, RedirectionService]
})
export class CompareHeroBannerComponent extends BaseComponent implements OnInit {
	@Input() data: any;
	constructor(private compareBannerService: CompareBannerService,
		private _router: Router,
		private _activatedRoute: ActivatedRoute,
		private _redirectionService: RedirectionService) {
		super();
	}

	ngOnInit() {

	}

	Init() {

	}

	public ManageContentNavigation(data: any) {
		let obj = new ContentNavigation().ManagePageRedirection(data);
		this._redirectionService.HandleNavigation(obj, this._router, this._activatedRoute);
	}
}
