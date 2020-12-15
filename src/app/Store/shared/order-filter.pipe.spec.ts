import { OrderFilter } from './order-filter.pipe';

describe("Order Filter Pipe", () => {
    it("should filter data", () => {
        const pipe = new OrderFilter();
        pipe.transform(undefined, undefined);
        pipe.transform(undefined, 'Filter by Status');
        pipe.transform(undefined, 'All');
        const result = pipe.transform([{ status: 1 }, { status: 2 }], 'All');
        expect(result).toBeTruthy();
    });
});

