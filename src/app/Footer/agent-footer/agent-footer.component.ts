import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agent-footer',
  templateUrl: './agent-footer.component.html',
  styleUrls: ['./agent-footer.component.css']
})
export class AgentFooterComponent implements OnInit {
  dataAnalyticsRegion: any;
  deviceListPage = false;
  current_year = '';
  constructor() { }

  ngOnInit() {
    this.dataAnalyticsRegion = "FOOTER";
    if (window.location.href.indexOf('store/devices') > -1 || window.location.href.indexOf('/plans/') > -1 ||
    window.location.href.indexOf('/device-detail/') > -1) {
      this.deviceListPage = true;
    }
    const date = new Date();
    this.current_year = date.getFullYear() + '';
  }

}
