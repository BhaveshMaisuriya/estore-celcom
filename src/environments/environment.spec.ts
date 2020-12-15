import { environment } from "./environment.prod";

describe("Environment", () => {
    it("should configure the environment", () => {
        const val = environment;

        expect(val).toBeDefined();
        expect(val).toBeTruthy();
    });
});
