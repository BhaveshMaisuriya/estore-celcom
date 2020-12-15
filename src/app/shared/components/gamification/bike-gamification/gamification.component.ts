import {
  Component,
  ViewEncapsulation,
  AfterViewInit,
  OnChanges,
  ChangeDetectorRef,
  Input
} from "@angular/core";
import { ModalService } from "../../modal/modal.service";
import gsap from "gsap";
import { UserService } from "app/Service/user.service";
import {
  ICustData,
  GameEligibilityCheckService,
  IVoucherData
} from "app/Service/game-eligibility-check.service";


@Component({
  selector: "app-gamification",
  templateUrl: "./gamification.component.html",
  styleUrls: ["./gamification.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class GamificationComponent implements AfterViewInit, OnChanges {
  isRiderMove: boolean = false;
  timeline: gsap.core.Timeline;
  explosionPath: string;
  @Input() voucherData: IVoucherData[];
  @Input() payload: ICustData;
  wonVoucher: IVoucherData;
  stage: number = 1;
  isDealer = false;
  firstRow:IVoucherData[] = [];
  secondRow:IVoucherData[] = [];
  timeoutDone:boolean = false;
  apiCallDone:boolean = false;

  constructor(
    private _modalService: ModalService,
    private _userService: UserService,
    private _gameEligibilityCheckService: GameEligibilityCheckService,
    private cdr: ChangeDetectorRef
  ) {}

  init(): void {
    this.isDealer = this._userService.isDealer();
    this.firstRow = [];
    this.secondRow = [];
    this.timeoutDone = false;
    this.apiCallDone = false;

    if (this.voucherData?.length > 3) {
      this.voucherData.forEach((item, index) => {
        if (index % 2 === 0) {
          this.firstRow.push(item);
        } else {
          this.secondRow.push(item);
        }
      });
    } else {
      this.firstRow = this.voucherData;
    }

    // creating a timeline
    this.timeline = gsap.timeline();
    // fading tap me button
    this.timeline.to("#tap_me", {
      duration: 0.5,
      opacity: 0
    });

    this.stage = 1;

    this.timeline.add("start", 0.1);

    this.timeline.to(
      "#smallsmoke",
      {
        opacity: 1,
        duration: 0.5,
        repeat: 2
      },
      "start"
    );
    this.timeline.to(
      "#smallsmoke",
      {
        opacity: 0,
        duration: 0.5,
        delay: 1
      },
      "start"
    );

    // moving bike container as smoke is with it
    this.timeline.to("#rider-container", {
      x: "23vw",
      ease: "step-end",
      duration: 3,
      onComplete: this.riderAnimationComplete
    });

    // this used for adding smoke animation after 1s of animation start
    this.timeline.add("smoke", 1);
    this.timeline.to(
      "#bigsmoke",
      {
        opacity: 1,
        duration: 0.5,
        repeat: 4
      },
      "smoke"
    );

    this.timeline.pause();
  }

  riderAnimationComplete = () => {
    this.timeline.pause();
    this.explosionPath = "assets/img/gamification/Explosion.gif";
    this.stage = 2;
    this.callAnimationComplete();
    setTimeout(() => {
      this.timeoutDone = true;
      if(this.apiCallDone){
        this.stage = 3;
      }
    }, 1000);
  };

  moveRider() {
    this.timeline.play();
  }

  ngOnChanges() {
    this.init();
  }

  callAnimationComplete() {
    const payload = {
      ...this.payload,
      played: true
    };
    this._gameEligibilityCheckService.checkEligibility(payload).subscribe(
      res => {
        // completed
        this.apiCallDone = true;
        this.wonVoucher = res.voucher_data.find(v => v.selected === "Yes");
        if(this.timeoutDone){
          this.stage = 3;
        }
      },
      err => {
        this._modalService.showError(err);
      }
    );
  }

  closePopup() {
    this._modalService.close("gamification-popup");
  }

  ngAfterViewInit() {
    this.init();
    this.cdr.detectChanges();
  }
}
