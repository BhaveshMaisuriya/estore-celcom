import { AfterContentInit, Component, ContentChildren, QueryList, Input,Output,EventEmitter } from '@angular/core';
import { TabComponent } from '../tab/tab.component';

@Component({
	selector: 'cc-tabs-new',
	templateUrl: './tabs-new.component.html',
	styleUrls: ['./tabs-new.component.css', '../../../../assets/css/google-fonts.css']
})
export class TabsNewComponent implements AfterContentInit {
	@Input() tabcolor: any;
	@Input() data: any;
	@Input() IsXPax: boolean;	
	@Output() OnSelectedTab:EventEmitter<any> = new EventEmitter();
	@ContentChildren(TabComponent) tabs: QueryList<TabComponent>;

	ngAfterContentInit() {
		if(this.data){   
			this.tabs = this.data;	
			// get all active tabs
			const activeTabs = this.tabs.filter((tab) => tab.active);
			// if there is no active tab set, activate the first
			if (activeTabs.length === 0) {
				this.selectTab(this.tabs.first);
			}			
		}
		else{
			// get all active tabs
			const activeTabs = this.tabs.filter((tab) => tab.active);
			// if there is no active tab set, activate the first
			if (activeTabs.length === 0) {
				this.selectTab(this.tabs.first);
			}			
		}
	}
	ngOnInit(){
		if(this.data){   
			this.tabs = this.data;	
		}
	}
	
	selectTab(tab: TabComponent) {
		// deactivate all tabs		
		this.tabs.forEach((item) => {
			item.active = false;
		});
		// activate the tab the user has clicked on.
		tab.active = true;
		this.OnSelectedTab.emit(tab);
	}
}
