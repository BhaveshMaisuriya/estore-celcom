import { Component, OnInit, Input } from "@angular/core";
import { IEditDetailsWrapperComponent } from "./edit-details-wrapper.model";

@Component({
  selector: "app-edit-details-wrapper",
  templateUrl: "./edit-details-wrapper.component.html",
  styleUrls: ["./edit-details-wrapper.component.scss"],
})
export class EditDetailsWrapperComponent
  implements IEditDetailsWrapperComponent, OnInit {
  @Input() visible;
  @Input() title;

  constructor() {}

  ngOnInit() {}
}
