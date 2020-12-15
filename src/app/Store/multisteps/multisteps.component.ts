import { Component, OnInit, ViewContainerRef, Input } from '@angular/core';
import { AppWidgetComponent } from '../../Model/app.widget.component';

@Component({
  selector: 'app-multisteps',
  templateUrl: './multisteps.component.html',
  styleUrls: ['./multisteps.component.css'],
})
export class MultistepsComponent implements OnInit, AppWidgetComponent {
  @Input() data: any;
  public multistepsResponse: any = null;

  constructor(
  ) {
  }

  ngOnInit() {
    this.Init();
  }

  private Init() {
    const response = {
      "Items": [{
        "Title": "Steps to Register",
        "field_background_color": "is-bg-color-white",
        "ButtonLink": "",
        "ButtonText": "",
        "ButtonAnalytic": "",
        "ButtonAttribute": "",
        "ButtonTwoLink": "",
        "ButtonTwoText": "",
        "Button2Analytic": "",
        "Button2Attribute": "",
        "ButtonLinkAbsolute": "",
        "ButtonTwoLinkAbsolute": "",

        "Steps": [
          {
            "title": "STEP",
            "description": "Register your information",
            "fieldIcon": "/assets/img/multisteps/icon_step_1.svg"
          },
          {
            "title": "STEP",
            "description": "Login with OTP given via email",
            "fieldIcon": "/assets/img/multisteps/icon_step_2.svg"
          },
          {
            "title": "STEP",
            "description": "Make your order",
            "fieldIcon": "/assets/img/multisteps/icon_step_3.svg"
          }
        ]
      }],
      "Status": "OK",
      "StatusMessage": "SUCCESS"
    };

    if (response['Items'].length > 0) {
      this.multistepsResponse = response['Items'][0];
      // logic for step count & dynamic class for center align
      let stepCount = this.multistepsResponse.Steps.length;
      this.multistepsResponse.Steps.forEach((item: any) => {
        if (stepCount == 2) {
          item.StepClass = 'is-col-tablet-p-6';
        }
        if (stepCount == 3) {
          item.StepClass = 'is-col-tablet-p-4';
        }
        if (stepCount == 4) {
          item.StepClass = 'is-col-tablet-p-3';
        }
      });
    }
  }
}