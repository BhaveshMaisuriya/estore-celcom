import { httpInterceptorProviders } from "./index";

describe('HttpInterceptorProviders', () => {
    const val = httpInterceptorProviders;

    it('should be defined', () => {
        expect(val).toBeDefined();
    });
});
