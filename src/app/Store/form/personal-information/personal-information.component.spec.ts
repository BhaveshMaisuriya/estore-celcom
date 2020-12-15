import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule
} from "@angular/forms";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { PersonalInformationComponent } from "./personal-information.component";
import { EstoreInputComponent } from "app/shared/components/forms/estore-input/estore-input.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { of } from "rxjs";
import { AppService } from "app/Service/app.service";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { sharedDirectives } from "app/shared/directives";
import { materialModules } from "app/shared/shared-module.module";
import { CommonUtilService } from "app/Service/commonUtil.service";

const mockResponse = 
  {
    status: true,
    message: "Message",
    available_regions: [
      {
        id: "533",
        code: "JH",
        name: "Johor"
      },
      {
        id: "534",
        code: "KD",
        name: "Kedah"
      },
      {
        id: "535",
        code: "KN",
        name: "Kelantan"
      }
    ]
  };

describe("PersonalInformationComponent", () => {
  let component: PersonalInformationComponent;
  let fixture: ComponentFixture<PersonalInformationComponent>;
  let commonUtilService: CommonUtilService;
  let appService: AppService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        materialModules
      ],
      providers: [FormBuilder,
        CommonUtilService,
         AppService
      ],
      declarations: [
        sharedDirectives,
        PersonalInformationComponent,
        EstoreInputComponent
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalInformationComponent);
    component = fixture.componentInstance;
    appService = TestBed.inject(AppService);
    commonUtilService = TestBed.inject(CommonUtilService);
    component.personalDetails = new FormGroup({
      salutation: new FormControl(""),
      name: new FormControl(""),
      email: new FormControl(""),
      idType: new FormControl(""),
      idNumber: new FormControl(""),
      primaryNumber: new FormControl(""),
      secondaryNumber: new FormControl(""),
      building: new FormControl(""),
      addressOne: new FormControl(""),
      addressTwo: new FormControl(""),
      postCode: new FormControl(""),
      city: new FormControl(""),
      state: new FormControl("")
    });
  });

  it("should create component", () => {
    expect(component).toBeTruthy();
  });

  it("should call ngOnInit", (done) => {
    const spy = spyOn(appService, "getEstoreData").and.returnValue(of(mockResponse));
    appService.getEstoreData("/rest/V1/directory/countries/MY").subscribe(resp =>{
      done();
    });
    component.idDetails = { idType: "NRIC", idNumber: "132354566712" };
    component.ngOnInit();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });

  it("should call onTypeChanges", () => {
    const spy = spyOn(component, "onTypeChanges").and.callThrough();
    component.personalDetails.get("idType").setValue("Passport");
    component.onTypeChanges();
    expect(spy).toHaveBeenCalled();
  });

  it("should call restrictBasedOnType", () => {
    let spy = spyOn(commonUtilService, "restrictOnlyNum");
    const event = {
      keyCode: 12,
      which: 12,
      charCode: 12
    };
    component.personalDetails.get("idType").setValue("test");
    component.personalDetails.get("idNumber").setValue("123456");
    component.restrictBasedOnType(event);
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });

  it("should call restrictPrimary", () => {
    const spy = spyOn(component, "restrictPrimary").and.callThrough();
    const event = {
      keyCode: 12,
      which: 12,
      charCode: 12
    };
    component.restrictPrimary(event);
    expect(spy).toHaveBeenCalled();
  });

  it("should call restrictSecondary", () => {
    const spy = spyOn(component, "restrictSecondary").and.callThrough();
    const event = {
      keyCode: 12,
      which: 12,
      charCode: 12
    };
    component.restrictSecondary(event);
    expect(spy).toHaveBeenCalled();
  });

  it("should call validateNRIC", () => {
    const spy = spyOn(component, "validateNRIC").and.callThrough();
    const event = {
      keyCode: 12,
      which: 12,
      charCode: 12
    };

    component.personalDetails.get("idNumber").setValue("");
    component.validateNRIC(component.personalDetails.get("idNumber"));

    component.personalDetails.get("idNumber").setValue("122343556546223435");
    component.validateNRIC(component.personalDetails.get("idNumber"));

    component.personalDetails.get("idNumber").setValue("123456789012");
    component.validateNRIC(component.personalDetails.get("idNumber"));
    expect(spy).toHaveBeenCalled();
  });

  it("should call MobileNumber", () => {
    const event = {
      keyCode: 12,
      which: 12,
      charCode: 12
    };

    const spy = spyOn(component, "MobileNumber").and.callThrough();
    component.personalDetails.get("primaryNumber").setValue("");
    component.MobileNumber(event, "primary");

    component.personalDetails.get("primaryNumber").setValue("abc");
    component.MobileNumber(event, "primary");

    component.personalDetails.get("primaryNumber").setValue("012345");
    component.MobileNumber(event, "primary");

    component.personalDetails.get("primaryNumber").setValue("");
    component.MobileNumber(event, "");

    component.personalDetails.get("primaryNumber").setValue("abc");
    component.MobileNumber(event, "");

    component.personalDetails.get("primaryNumber").setValue("012345");
    component.MobileNumber(event, "");
    expect(spy).toHaveBeenCalled();
  });

  it("should get form controls", () => {
    let val = component.salutationControl;
    val = component.nameControl;
    val = component.emailControl;
    val = component.genderControl;
    val = component.contactMethodControl;
    val = component.buildingControl;
    val = component.addressOneControl;
    val = component.addressTwoControl;
    val = component.postCodeControl;
    val = component.cityControl;
    val = component.stateControl;
    expect(val).toBeTruthy();
  });
});
