import { Component, OnInit, Input, OnDestroy, ElementRef, ContentChild, TemplateRef } from '@angular/core';
import { ModalService } from './modal.service';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnDestroy {

  /**
   * Wether the modal has rounded corner or not
   * default = false
   */
  @Input() rounded: boolean = false;

  /**
   * Required input
   */
  @Input() id: string;

  /**
   * If true then it will automatically be shown
   */
  @Input() autoShow: boolean = false;

  @Input() autoCloseOnBackdrop: boolean = false;

  @Input() closeBtn: boolean = true;
  @Input() position: 'top' | 'center' = 'top';

  private element: any;

  onClosed = new BehaviorSubject(null);

  isShown = false;

  context: any;

  visible = true;

  @ContentChild(TemplateRef)
  templateRef : TemplateRef<any>;

  constructor(private modalService: ModalService, private el: ElementRef) {
    this.element = el.nativeElement;
  }

  ngOnInit(): void {
    // ensure id attribute exists
    if (!this.id) {
      console.error('modal must have an id');
      return;
    }
    if (this.autoShow)
      this.isShown = true;

    // move element to bottom of page (just before </body>) so it can be displayed above everything else
    document.body.appendChild(this.element);

    // add self (this modal instance) to the modal service so it's accessible from controllers
    this.modalService.add(this);
  }

  // remove self from modal service when component is destroyed
  ngOnDestroy(): void {
    this.modalService.remove(this.id);
    this.element.remove();
  }

  // open modal
  open(context = null) {
    // this.titleCtx = title;
    // this.messageCtx = msg;
    this.context = context;
    this.isShown = true;
    this.onClosed = new BehaviorSubject(-1);
    this.modalService.onShowModal.next(this.id);
    return this.onClosed.pipe(
      filter(d => d != -1)
    );
  }

  // close modal
  close(result = null, modal: ModalComponent = null): void {
    const mdl = modal || this;
    mdl.isShown = false;
    mdl.modalService.onClosedModal.next(mdl.id);
    mdl.onClosed.next(result);
    mdl.onClosed.complete();
  }

  toggleShowHide() {
    this.visible = !this.visible;
  }

  forceVisible(force: boolean) {
    this.visible = force;
  }

  onBackdropClick() {
    if (this.autoCloseOnBackdrop) {
      this.close();
    }
  }

}
