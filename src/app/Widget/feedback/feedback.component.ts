import { Component, OnInit,Input } from '@angular/core';
import { RequestOptionsArgs,RequestOptions, Headers} from "@angular/http";
import {NotificationPopupEvent} from '../../Service/broadcaster.service';
import {CookieService} from 'ngx-cookie-service';

@Component({
	selector: 'feedback-component',
	templateUrl: './feedback.component.html',
	styleUrls: ['./feedback.component.css']	
})
export class FeedbackComponent implements OnInit {
 	public sheetUrl = "";
	private numberOfStars = 5;
	public stars = new Array(this.numberOfStars);	
	private isSelected: boolean = false;
	public activeIndex: number = -1;
	public selectedIndex: number = -1;
	@Input() data:any;
	public OldwebSiteUrl:string="";
	public IsSuccess:boolean= false;

	public formSubmitted = false;
	public ratingValue: number = 0;
	public ratingComment: string;
	public cookieValue: string;

	constructor(
		private notificationEvent: NotificationPopupEvent,
		private cookieService: CookieService		
	){	
	}
	ngOnInit(){  
		if(this.data!=null && this.data != undefined){
			this.OldwebSiteUrl = this.data.Url;
		}
		else{
			//default url
			this.OldwebSiteUrl = "https://www.celcom.com.my/personal";
		}
	}
	setActiveIndex(i) {
		this.activeIndex = i;		
	}

	removeActiveIndex() {
		if (!this.isSelected) {
			this.activeIndex = -1;
		} else {
			this.activeIndex = this.selectedIndex;
		}
	}

	selectIndex(i) {
		this.isSelected = true;
		this.activeIndex = i;
		this.selectedIndex = i;
		this.ratingValue = (i + 1);
		if (typeof document !== 'undefined') {
			let starRating = document.getElementById("starRating");
			let dataRate = starRating.attributes.getNamedItem('data-rate');
			dataRate.value = this.ratingValue.toString();
		}
	}
	
	private headers: Headers = new Headers(
		{
		  "Content-Type": "application/json"		
		}
	);
	
	public handleFormSubmit() { 	
		let that = this;	
		// we are submitting via xhr below
		var data = this.getFormData(); //"Rating=22&message=rererere&formDataNameOrder=['Rating','message']&formGoogleSheetName=responses";
		this.checkFeedBackSubmitCookie();	
		let actionUrl:string = this.sheetUrl;
		var xhr = new XMLHttpRequest();
		var proxyURL = 'https://cors-anywhere.herokuapp.com';
		// let param =  "Rating=22&message=rererere&formDataNameOrder=['Rating','message']&formGoogleSheetName=Responses"

		xhr.open('POST',  proxyURL + '/' + actionUrl, true);

		// xhr.withCredentials = true;
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
		xhr.setRequestHeader("Access-Control-Allow-Headers", "Origin, Content-Type, X-Auth-Token");
		xhr.setRequestHeader("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
		xhr.setRequestHeader("Access-Control-Allow-Methods", "HEAD, GET, POST, PUT, PATCH, DELETE");
		xhr.onreadystatechange = function() {	
			console.log( xhr.status, xhr.statusText )
			console.log(xhr.readyState);	
			if (xhr.readyState === 4) {
                if (xhr.status === 200) {
					console.log( xhr.status, xhr.statusText )
					console.log(xhr.responseText);
					that.IsSuccess = true;
					setTimeout(function() {
						if(typeof window !== 'undefined'){
								window.location.href = that.OldwebSiteUrl;
							}				
						}, 1000);	
                } 
            }		
			return false;
		};
		// url encode form data for sending as post data
		var encoded = Object.keys(data).map(function(k) {
			return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
		}).join('&')
		xhr.send(encoded);
	   
	  }

	  public getFormData() {		 
		  if(this.ratingComment==undefined){
			  this.ratingComment="NA";
		  }		
		let data = {
			"Rating":this.ratingValue,
			"message":this.ratingComment,
			"formGoogleSheetName":"Responses"
		};
		//add form-specific values into the data
		return data;
		
	  }
	  
	  public Close(){
		  let data={
			  Type:"CLOSE"
		  }		  
		  this.notificationEvent.fire(data);
	  }

	  public checkFeedBackSubmitCookie(){
		//var clicksCount: any;
		//set cookie if user clicks ok submit button
		if(!(this.cookieService.check('isFeedBackSubmitted'))) {		
			this.cookieService.set("isFeedBackSubmitted", "true", 1);
		}		
	  }
		
}
