import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class StickySummaryService {
    private step = 1;
    stepChange = new Subject<void>();

    constructor() {
    }

    setStep(updateStep) {
        this.step = updateStep;
        this.stepChange.next();
    }

    currentStep() {
        return this.step;
    }

    nextStep() {
        this.step++;
        this.stepChange.next();
    }

    resetStep() {
        this.step = 1;
        this.stepChange.next();
    }
}
