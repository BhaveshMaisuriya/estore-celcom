// tslint:disable
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Pipe, PipeTransform, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClawGamificationComponent } from './claw-gamification.component';
import { GameEligibilityCheckService } from 'app/Service/game-eligibility-check.service';
import { ModalService } from '../../modal/modal.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import * as confetti from "canvas-confetti";

@Directive({ selector: '[oneviewPermitted]' })
class OneviewPermittedDirective {
  @Input() oneviewPermitted;
}

@Pipe({name: 'translate'})
class TranslatePipe implements PipeTransform {
  transform(value) { return value; }
}

@Pipe({name: 'phoneNumber'})
class PhoneNumberPipe implements PipeTransform {
  transform(value) { return value; }
}

@Pipe({name: 'safeHtml'})
class SafeHtmlPipe implements PipeTransform {
  transform(value) { return value; }
}

describe('ClawGamificationComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    const gameEligibilityCheckServiceStub = () => ({
      checkEligibility: () => ({ subscribe: find => find({}) }),
    });
    const modalServiceStub = () => ({ showError: string => ({}), close: string => ({}) });
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule, HttpClientTestingModule ],
      declarations: [
        ClawGamificationComponent,
        TranslatePipe, PhoneNumberPipe, SafeHtmlPipe,
        OneviewPermittedDirective
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        { provide: GameEligibilityCheckService, useFactory: gameEligibilityCheckServiceStub },
        { provide: ModalService, useClass: modalServiceStub }
      ]
    }).overrideComponent(ClawGamificationComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(ClawGamificationComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    component.ngOnDestroy = function() {};
    fixture.destroy();
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnInit()', async () => {

    component.ngOnInit();

  });

  it('should run #fire()', async () => {
    component.myConfetti = confetti.create(component.myCanvas?.nativeElement, { resize: true });
    component.myCanvas = component.myCanvas || {};
    component.myCanvas.nativeElement = 'nativeElement';
    spyOn(component, "myConfetti").and.callThrough();
    component.fire({}, {});
    expect(component.myConfetti).toHaveBeenCalled();
  });

  it('should run #celebrate()', async () => {
    component.myConfetti = confetti.create(component.myCanvas?.nativeElement, { resize: true });
    component.myCanvas = component.myCanvas || {};
    component.myCanvas.nativeElement = 'nativeElement';
    spyOn(component, "myConfetti").and.callThrough();
    spyOn(component, "fire").and.callThrough();
    component.celebrate();
    expect(component.fire).toHaveBeenCalled();
  });

  it('should run #gamificationComplete()', async () => {
    const gameEligibilityCheckServiceStub: GameEligibilityCheckService = fixture.debugElement.injector.get(
      GameEligibilityCheckService
    );
    spyOn(gameEligibilityCheckServiceStub, "checkEligibility").and.callThrough();
    component.gamificationComplete();
    expect(component._gameEligibilityCheckService.checkEligibility).toHaveBeenCalled();

  });

  it('should run #startClick()', async () => {
    component.isStartClicked = false;
    component.startClick();
    expect(component.isStartClicked).toEqual(true);
  });

  it('should run #closePopup()', async () => {
    const modalServiceStub: ModalService = fixture.debugElement.injector.get(
      ModalService
    );
    spyOn(modalServiceStub, "close").and.callThrough();
    component.closePopup();
    expect(component._modalService.close).toHaveBeenCalled();
  });

  it('should run #displayVoucherWon()', async () => {
   spyOn(component, 'celebrate').and.callThrough();
   component.displayVoucherWon();
   expect(component.celebrate).toHaveBeenCalled();
   expect(component.showWonVoucher).toEqual(true);
  });

  it('should run #handleClick()', async () => {
    component.isStartClicked = true;
    component.clawPosition = -100;
    spyOn(component, 'move').and.callThrough();
    component.handleClick(1);
    expect(component.move).toHaveBeenCalled();
    expect(component.currentClick).toEqual(1);
    expect(component.clawPosition).toEqual(-124);
    component.handleClick(2);
    expect(component.move).toHaveBeenCalled();
    expect(component.currentClick).toEqual(2);
    expect(component.clawPosition).toEqual(-100);
    component.clawPosition = -10;
    component.handleClick(3);
    expect(component.move).toHaveBeenCalled();
    expect(component.currentClick).toEqual(3);
  });

  it("currentClick should be null after 500ms", fakeAsync(() => {
    component.isStartClicked = true;
    component.clawPosition = -100;
    component.handleClick(1);
    tick(500);
    fixture.detectChanges();
    expect(component.currentClick).toEqual(null);
    component.clawPosition = -10;
    spyOn(component, 'move').and.callThrough();
    component.handleClick(3);
    tick(500);
    fixture.detectChanges();
    expect(component.move).toHaveBeenCalled();
    expect(component.currentClick).toEqual(3);
  }))

});
