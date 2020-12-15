import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { materialModules } from 'app/shared/shared-module.module';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { EstoreInputComponent } from '../forms/estore-input/estore-input.component';

import { CopyLinkFormComponent } from './copy-link-form.component';
import { sharedDirectives } from 'app/shared/directives';
import { sharedPipes } from 'app/shared/pipes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CopyLinkFormComponent', () => {
  let component: CopyLinkFormComponent;
  let fixture: ComponentFixture<CopyLinkFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ 
        FormsModule,
        ToastrModule.forRoot(),
        materialModules,
        BrowserAnimationsModule,
      ],
      declarations: [ 
        CopyLinkFormComponent,
        EstoreInputComponent,
        sharedDirectives,
        sharedPipes,
      ],
      providers: [ToastrService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CopyLinkFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
