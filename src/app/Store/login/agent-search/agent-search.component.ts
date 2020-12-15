import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-agent-search',
  templateUrl: './agent-search.component.html',
  styleUrls: ['./agent-search.component.css']
})
export class AgentSearchComponent implements OnInit, AfterViewInit {
  customMessage = false;
  customMsg = "";
  maxlength = 12;
  public nricId: any = "";

  constructor(private _router: Router) {
  }
  ngOnInit() {
  }
  public RedirectSearch() {
    this._router.navigateByUrl('store/account/order-search/' + this.nricId);
  }

  public validationForIdType(identity_value) {
    this.customMessage = false;
    const type = "1";
    const idValue = identity_value;
    // let setAttribute = false;

    if (type === "1") {
        if (idValue === "") {
          this.customMsg = "Please enter a value";
          this.customMessage = true;
          return this.customMsg;
        }
        let pattern = /^[0-9]{12}$/;
        if (!pattern.test(idValue)) {
          this.customMsg = "Please enter a valid NRIC ID of 12 digit";
          this.customMessage = true;
          this.maxlength = 12;
          return this.customMsg;
        }
        pattern = /^\d+$/;
        if (!pattern.test(idValue)) {
          this.customMessage = true;
          this.customMsg = "Please enter digits only";
          return this.customMsg;
        }

        if (idValue.length === 12) {
          const year: any = idValue.slice(0, 2);
          const month: any = idValue.slice(2, 4);
          const DoB = idValue.slice(0, 6);
          const day: any = idValue.slice(4, 6);
          const fullDOB = new Date(year, month - 1, day);
          const dateTxtlength = (fullDOB.getDate().toString().length < 2);
          const monthTxtLength = ((fullDOB.getMonth() + 1).toString().length < 2);
          const convertedDay = dateTxtlength ? ("0" + fullDOB.getDate().toString()) : fullDOB.getDate().toString();
          const convertedMonth = monthTxtLength ? ("0" + (fullDOB.getMonth() + 1).toString()) : (fullDOB.getMonth() + 1).toString();
          const convertedDOB = "" + fullDOB.getFullYear().toString().slice(2, 4) + convertedMonth + convertedDay;
          // Check DOB
          if (DoB !== convertedDOB) {
            this.customMsg = "Please enter a valid NRIC ID of 12 digit";
            this.customMessage = true;
            return this.customMsg;
          } else {
            this.customMessage = false;
            return 0;
          }
        }
    }
  }

  ngAfterViewInit() {
   if (typeof window !== "undefined" && sessionStorage && sessionStorage.getItem("DealerInfo")) {
    window.location.href = "/store/devices";
   }
 }

}
