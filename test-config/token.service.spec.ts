import { TestBed } from '@angular/core/testing';
import { TokenService } from './token.service';
describe('TokenService', () => {
    let service: TokenService;
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [TokenService]
        });
        service = TestBed.get(TokenService);
    });
    it('should create the service', () => {
        expect(service).toBeTruthy();
    });
});
