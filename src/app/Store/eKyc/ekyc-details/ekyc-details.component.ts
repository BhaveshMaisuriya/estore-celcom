import { Component, Input, OnInit } from '@angular/core';
import { HOST } from 'app/Service/app.service';
import { IEkycCustomerdata } from '../e-kyc.model';

@Component({
  selector: 'app-ekyc-details',
  templateUrl: './ekyc-details.component.html',
  styleUrls: ['./ekyc-details.component.scss']
})
export class EkycDetailsComponent implements OnInit {

  @Input() ekycDetails: IEkycCustomerdata;
  @Input() showImage: boolean;
  host = HOST;

  constructor() { }

  ngOnInit(): void {
    if(this.host.length === 0){
      this.host = window.location.origin;
    }
  }

}
