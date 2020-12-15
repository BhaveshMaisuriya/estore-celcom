import { Component, Input } from '@angular/core';

@Component({
	selector: 'cc-tab',
	styleUrls: ['./tab.component.scss'],
	templateUrl: './tab.component.html'
})
export class TabComponent {
	@Input() title: string;
	@Input() active = false;
}
