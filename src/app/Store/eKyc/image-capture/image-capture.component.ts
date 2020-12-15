import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  ViewChild
} from "@angular/core";
import { EKycService } from "../e-kyc.service";

@Component({
  selector: "app-image-capture",
  templateUrl: "./image-capture.component.html",
  styleUrls: ["./image-capture.component.scss"]
})
export class ImageCaptureComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild("video", { static: true }) videoElement: ElementRef;
  @ViewChild("canvas", { static: true }) canvas: ElementRef;

  @Input() mode: string;
  @Output() imageSet = new EventEmitter();
  @Output() close = new EventEmitter();

  constraints = {
    video: {
      facingMode: "environment",
      width: { ideal: 1377 },
      height: { ideal: 2000 }
    }
  };

  stream;
  isVideoPlaying: boolean = true;

  videoWidth = 0;
  videoHeight = 0;

  constructor(private renderer: Renderer2, private _ekycService: EKycService) {}

  ngOnInit(): void {
    this.init();
  }

  ngOnChanges() {
    this.init();
  }

  init() {
    this.constraints.video.facingMode = this.mode;
    if (this.mode === 'environment') {
      this.constraints.video.width = { ideal: 1377 };
      this.constraints.video.height = { ideal: 2000 };
    } else {
      this.constraints.video.width = { ideal: 720 };
      this.constraints.video.height = { ideal: 720 };
    }
    this.startCamera();
  }

  handleError(error) {
    console.log("Error: ", error);
  }

  attachVideo(stream) {
    this.renderer.setProperty(
      this.videoElement.nativeElement,
      "srcObject",
      stream
    );
    this.renderer.listen(this.videoElement.nativeElement, "play", event => {
      this.videoHeight = this.videoElement.nativeElement.videoHeight;
      this.videoWidth = this.videoElement.nativeElement.videoWidth;
    });
    this.stream = stream;
    this.videoElement.nativeElement.controls = false;
    this.isVideoPlaying = true;
  }

  stopVideo() {
    this.stream?.getTracks().forEach(track => track.stop());
    this.isVideoPlaying = false;
  }

  retake() {
    this.startCamera();
  }

  startCamera() {
    if (!!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
      navigator.mediaDevices
        .getUserMedia(this.constraints)
        .then(this.attachVideo.bind(this))
        .catch(this.handleError);
    } else {
      alert("Sorry, camera not available.");
    }
  }

  capture() {
    const compression = this.mode === 'environment' ? 0.8 : 1;
    this.renderer.setProperty(this.canvas.nativeElement, "width", this.videoWidth);
    this.renderer.setProperty(this.canvas.nativeElement, "height", this.videoHeight);
    this.canvas.nativeElement
      .getContext("2d")
      .drawImage(this.videoElement.nativeElement, 0, 0, this.videoWidth, this.videoHeight);
    const data = this.canvas.nativeElement.toDataURL("image/jpeg", compression);
    this._ekycService.setImage(data);
    this.stopVideo();
  }

  upload() {
    this.imageSet.emit();
  }

  handleClose() {
    this.close.emit();
  }

  ngOnDestroy() {
    this.stopVideo();
  }
}
