import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { EmailVerificationComponent } from '../../Store/email-verification/email-verification.component';
import { AppService } from "../../Service/app.service";
import { HttpClient, HttpHeaders, HttpParams, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
let url = 'VerifiedEmail';
class MockAppService{
  postEmailVerificationStatus(){
    if(url == 'VerifiedEmail'){
      return Observable.of([{error:{status: false, message:"Update Successful"}}]);
    }else{
      return Observable.throw([{error:{status: false, message:"Update Failed"}}]);
    }
  }
}
describe('EmailVerificationComponent', () => {
    let component: EmailVerificationComponent;
    let fixture: ComponentFixture<EmailVerificationComponent>;
  
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ EmailVerificationComponent ],
        providers:[{provide:AppService,useClass:MockAppService},HttpClient, HttpHandler]
      })
      .compileComponents();
    }));
  
    beforeEach(() => {
      fixture = TestBed.createComponent(EmailVerificationComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });
    it('should test successful verified email service', () => {
      component.ngOnInit();
      expect(component.apiStatus).toBe('Update failed');
    });
    it('should test failed verified email service', () => {
      url = "failedEmail";
      component.ngOnInit();
      expect(component.apiStatus).toBe('Update Failed');
    });
  });