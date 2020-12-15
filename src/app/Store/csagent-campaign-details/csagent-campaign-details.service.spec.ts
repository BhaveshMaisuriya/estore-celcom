import { TestBed } from '@angular/core/testing';
import { CsAgentCampaignDetailsService } from "./csagent-campaign-details.service";

describe('CsAgentCampaignDetailsService', () => {

    let service: CsAgentCampaignDetailsService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [CsAgentCampaignDetailsService]
        });

        service = TestBed.get(CsAgentCampaignDetailsService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should call getmockResponse', () => {
        const spy = spyOn(service, 'getmockResponse').and.callThrough();
        service.getmockResponse();
        expect(spy).toHaveBeenCalled();
    });
});
