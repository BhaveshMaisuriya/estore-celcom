import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class GuestCheckoutService {
    private loginAttempt = 0;
    private showItemAdded = false;
    private guestUserName = '';
    loginAttemptChanged = new Subject<void>();
    showItemAddedChanged = new Subject<void>();
    guestUsernameChanged = new Subject<void>();
    customerIDTypes = [
      { id: 1, value: "New NRIC" }
    ];

    constructor() {
    }

    getCustomerIDTypes() {
      return this.customerIDTypes;
    }

    getLoginAttempt() {
        return this.loginAttempt;
    }

    increaseLoginAttempt() {
        this.loginAttempt++;
        this.loginAttemptChanged.next();
    }

    clearLoginAttempt() {
        this.loginAttempt = 0;
        this.loginAttemptChanged.next();
    }

    getItemAddedStatus() {
        return this.showItemAdded;
    }

    setItemAddedStatus(stat) {
        this.showItemAdded = stat;
        this.showItemAddedChanged.next();
    }

    setGuestUserName(username) {
        this.guestUserName = username;
        this.guestUsernameChanged.next();
    }

    getGuestUserName() {
        return this.guestUserName;
    }
}
