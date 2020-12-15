import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { GameEligibilityCheckComponent } from "./game-eligibility-check.component";
import { ModalComponent } from "app/shared/components/modal/modal.component";
import { EstoreInputComponent } from "app/shared/components/forms/estore-input/estore-input.component";
import { AgentFooterComponent } from "app/Footer/agent-footer/agent-footer.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { DigitOnlyDirective } from 'app/shared/directives/digit-only/digit-only.directive';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ClawGamificationComponent } from 'app/shared/components/gamification/claw-gamification/claw-gamification.component';

describe("GameEligibilityCheckComponent", () => {
  let component: GameEligibilityCheckComponent;
  let fixture: ComponentFixture<GameEligibilityCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        GameEligibilityCheckComponent,
        AgentFooterComponent,
        ModalComponent,
        EstoreInputComponent,
        DigitOnlyDirective,
        ClawGamificationComponent,
      ],
      imports: [
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
        MatFormFieldModule,
        MatRadioModule,
        MatSelectModule,
        MatInputModule,
        HttpClientTestingModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameEligibilityCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
