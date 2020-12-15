import {
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from "@angular/core";
import {
  GameEligibilityCheckService,
  ICustData,
  IVoucherData
} from "app/Service/game-eligibility-check.service";
import * as confetti from "canvas-confetti";
import gsap from "gsap";
import { ModalService } from '../../modal/modal.service';

@Component({
  selector: "app-claw-gamification",
  templateUrl: "./claw-gamification.component.html",
  styleUrls: ["./claw-gamification.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class ClawGamificationComponent implements OnInit {
  @Input() payload: ICustData;
  wonVoucher: IVoucherData;
  myConfetti;
  @ViewChild("myCanvas") myCanvas: ElementRef;
  @ViewChild('circusAudio') circusAudio: ElementRef;
  @ViewChild('wonAudio') wonAudio: ElementRef;
  currentClick: number;
  clawPosition = -110;
  timeline: gsap.core.Timeline;
  showWonVoucher: boolean = false;
  isStartClicked: boolean = false;

  constructor(
    private _gameEligibilityCheckService: GameEligibilityCheckService,
    private _modalService: ModalService
  ) {}

  ngOnInit(): void {
    const selectedGift = Math.floor(Math.random() * 3) + 1;
    // creating a timeline
    this.timeline = gsap.timeline();
    this.timeline.to(`#gift${selectedGift}`, {
      opacity: 1,
      delay: 1.5
    });
    this.timeline
      .to("#clawGroup", {
        delay: 1.1,
        duration: 1,
        transform: 'translate(-110px, 52px)'
      })
      .to("#selectedgift", {
        duration: 0.5,
        transform: "translate(0px, 167px)",
        delay: 0.1,
        onComplete: this.displayVoucherWon
      });
    this.timeline.pause();
  }

  ngAfterViewInit(): void {
    const canvas = this.myCanvas?.nativeElement;
    this.myConfetti = confetti.create(canvas, { resize: true });
    this.circusAudio?.nativeElement.play();
    this.circusAudio.nativeElement.volume = 0.2;
  }

  fire(particleRatio, opts) {
    const defaults = {
      zIndex: 10000,
      origin: { y: 0.5, x: 0.5 },
    };
    const count = 2500;
    this.myConfetti(
      Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio),
        spread: 160
      })
    );
  }

  celebrate() {
    this.fire(0.25, {
      spread: 26,
      startVelocity: 55
    });
    this.fire(0.2, {
      spread: 60
    });
    this.fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    });
    this.fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2
    });
    this.fire(0.1, {
      spread: 120,
      startVelocity: 45
    });
  }

  displayVoucherWon = () => {
    this.showWonVoucher = true;
    this.circusAudio.nativeElement.pause();
    this.wonAudio.nativeElement.play();
    this.wonAudio.nativeElement.volume = 0.2;
    this.celebrate();
  };

  gamificationComplete() {
    const payload = {
      ...this.payload,
      played: true
    };
    this._gameEligibilityCheckService.checkEligibility(payload).subscribe(
      res => {
        // completed
        this.wonVoucher = res.voucher_data?.find(v => v.selected === "Yes");
      },
      err => {
        this._modalService.showError(err);
      }
    );
  }

  move() {
    const clawTimeline = gsap.timeline();
    clawTimeline.to("#clawGroup", {
      duration: 0.5,
      transform: `translate(${this.clawPosition}px, 52px)`
    });
    clawTimeline.play();
  }

  startClick() {
    if (!this.isStartClicked) {
      let count = 0;
      const startTimeline = gsap.timeline();
      startTimeline.to("#startBtn", {
        duration: 0.35,
        opacity: 0
      }).to('#instructions', {
        opacity: 1,
        duration: 0.35,
      });
      startTimeline.play();
      const intervalRef = setInterval(() => {
        this.clawPosition = this.clawPosition + (-1 * count%2 === 0 ? 1 : -1)*25;
        count++;
        if(count === 6) {
          clearInterval(intervalRef);
        }
        this.move();
      }, 100);
      const el = document.getElementById('Group_10930');
      el.scrollIntoView({ block: 'end',  behavior: 'smooth' });
      this.isStartClicked = true;
    }
  }

  closePopup() {
    this.circusAudio?.nativeElement.pause();
    this._modalService.close("claw-gamification-popup");
  }

  handleClick(val) {
    const step = 24;
    if (this.isStartClicked) {
      if (val === 1) {
        this.currentClick = val;
        if (this.clawPosition > -110) {
          this.clawPosition -= step;
        }
      } else if (val === 2) {
        this.currentClick = val;
        if (this.clawPosition < 130) {
          this.clawPosition += step;
        }
      } else if (val === 3 && this.clawPosition > -40) {
        this.currentClick = val;
        this.gamificationComplete();
        this.timeline.play();
      }
      this.move();
      setTimeout(() => {
        if (this.currentClick !== 3) {
          this.currentClick = null;
        }
      }, 500);
    }
  }
}
