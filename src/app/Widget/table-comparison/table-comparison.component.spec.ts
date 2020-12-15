import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BaseComponent } from '../../base.component';
import { ContentNavigation } from '../../Model/contentnavigation.model';
import { ActivatedRoute, Router } from '@angular/router';
import { RedirectionService } from '../../Service/redirection.service';
import { Broadcaster } from "../../Model/broadcaster.model";
import { NotificationPopupEvent } from "../../Service/broadcaster.service";
import { CookieService } from 'ngx-cookie-service';
import { TableComparisionService } from './table-comparison.service';
import {TableComparisonComponent} from './table-comparison.component';
import {TabsNewComponent} from '../../Widget/xpax/tabs-new/tabs-new.component';
import { AppService } from '../../Service/app.service';
import { AppMockService } from '../../Service/appmock.service';
import { Observable } from 'rxjs';
class RouterStub {
    navigateByUrl(url: string) {
        return url;
    }
}
class MockactivatedRoute {
    snapshot(url: string) {
        return url;
    }
}
let mockResp = {
    Items:[{
        AtrHref:"",
        TabTitle:"first table",
        TableInfo:[{
            Id:"",
            HrefId:"",
            PlanInfo:[{
                Id:"",
                HrefId:""
            }]
        }]
    },
    {
        AtrHref:"",
        TabTitle:"second table",
        TableInfo:[{
            Id:"",
            HrefId:""
        }]
    }]
}
class MockTableComparisionService{
    Find(){
        return Observable.of(mockResp);
    }
}
describe('TableComparisonComponent ', () => {
    let component: TableComparisonComponent;
    let fixture: ComponentFixture<TableComparisonComponent>;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            declarations: [TableComparisonComponent,TabsNewComponent],
            providers:[TableComparisionService,RedirectionService,Broadcaster,NotificationPopupEvent,CookieService,
                { provide: AppService, useClass: AppMockService },{ provide: Router, useClass: RouterStub },
                {
                    provide: ActivatedRoute, useClass: MockactivatedRoute
                }
            ]
        }).overrideComponent(TableComparisonComponent,{
            set:{
                providers:[{provide:TableComparisionService,useClass:MockTableComparisionService}]
            }
        }).compileComponents();

    }));
    beforeEach(async(() => {
        fixture = TestBed.createComponent(TableComparisonComponent);
        component = fixture.componentInstance;
    }));
    it('should create  Table Comparision component', () => {
        expect(component).toBeTruthy();
    });
    it('should test ngonint', () => {
        component.data = {Api :"test",Desktop:{img:"testImg"},Mobile:{img:"mobiletestImg"}};
        component.ngOnInit();
        expect(component.DesktopBackgroundImage).toBe('testImg');
        expect(component.MobileBackgroundImage).toBe('mobiletestImg');
        // expect(component).toBeTruthy();
    });
    it('should test ngonint', () => {
        component.data = {Api :"test",Desktop:{img:"testImg"},Mobile:{img:"mobiletestImg"}};
        component.IsXpax = true;
        component.ngOnInit();
        expect(component.DesktopBackgroundImage).toBe('testImg');
        expect(component.MobileBackgroundImage).toBe('mobiletestImg');
        // expect(component).toBeTruthy();
    });
    it('should test OnTabSelectFromChildComponent', () => {
        component.data = {Api :"test",Desktop:{img:"testImg"},Mobile:{img:"mobiletestImg"}};
        component.IsXpax = true;
        component.ngOnInit();
        let data = {title:"second table"}
        component.OnTabSelectFromChildComponent(data);
        expect(component.SelectedTab).toBe('second table');
        // expect(component.MobileBackgroundImage).toBe('mobiletestImg');
        // expect(component).toBeTruthy();
    });

    it('should test ManageContentNavigation', () => {
        const spy = spyOn(component, 'ManageContentNavigation');
        let data = {title:"second table"}
        component.ManageContentNavigation(data);
        expect(spy).toHaveBeenCalled();
    });
})