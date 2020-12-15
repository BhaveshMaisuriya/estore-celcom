import { Component, ElementRef, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'cc-notification',
	templateUrl: './notification.component.html',
	styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
	element: any;
	isNotificationOpen: boolean = true;
	@Output() notificationEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

	constructor(private el: ElementRef) {
		this.element = el.nativeElement;
	}
	ngOnInit() {
		this.updateNotificationStateOpen(true);
	}
	updateNotificationStateOpen(_isOpen) {
		this.isNotificationOpen = _isOpen;
		this.notificationEmitter.emit(this.isNotificationOpen);
	}

	closeNotification(event) {
		const target = event.target || event.srcElement || event.currentTarget;
		this.updateNotificationStateOpen(false);
		target.parentNode.parentNode.classList.add('is-closed');
	}

}
